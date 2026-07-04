import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PlaygroundEditor } from "@/features/editor/components/PlaygroundEditor";
import { FileTree } from "@/features/editor/components/FileTree";
import { PlaygroundTerminal } from "@/features/editor/components/PlaygroundTerminal";
import { PlaygroundNavbar } from "@/features/editor/components/PlaygroundNavbar";
import { FileTreeDialogs } from "@/features/editor/components/FileTree/FileTreeDialogs";
import { useDirectoryTreeQuery } from "@/apis/queries/useDirectoryTreeQuery";
import { useEditorSocket } from "@/hooks/useEditorSocket";
import { useCreateProject } from "@/hooks/useCreateProject";
import { useFileTreeDialogs } from "@/hooks/useFileTreeDialogs";
import type { DirectoryNode } from "@/types/project";
import { FolderPlus, FilePlus } from "lucide-react";

const FileTreeSkeleton = () => (
  <div className="flex flex-col gap-2.5 p-4 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`h-3.5 rounded bg-white/[0.04] ${i % 3 === 0 ? 'w-3.5' : 'w-4'}`} />
        <div className={`h-3 rounded bg-white/[0.04] ${i === 1 ? 'w-24' : i === 2 ? 'w-32' : i === 3 ? 'w-16' : 'w-28'}`} />
      </div>
    ))}
  </div>
);

const EditorSkeleton = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-bg-editor text-text-tertiary select-none">
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-white/[0.04] border-t-accent animate-spin" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8L10 12L6 16" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 16H18" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[13px] font-medium tracking-wide text-text-primary">Spinning up sandbox environment...</span>
        <span className="text-[11px] text-text-tertiary">Configuring workspace volumes</span>
      </div>
    </div>
  </div>
);

const TerminalSkeleton = () => (
  <div className="flex-1 bg-bg-deep p-4 font-mono text-[11px] leading-relaxed text-text-secondary select-none">
    <div className="flex items-center gap-2 text-text-tertiary mb-2">
      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      <span>System bootstrapping sequence initiated...</span>
    </div>
    <div className="text-white/15">Waiting for sandbox terminal socket connection...</div>
  </div>
);

export const ProjectPlaygroundPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { createProject } = useCreateProject();
  const [created, setCreated] = useState(!location.state?.isNew);
  const creationStartedRef = useRef(false);

  const {
    dialogState,
    deleteNode,
    inputValue,
    setInputValue,
    openDialog,
    openDeleteDialog,
    closeDialogs,
    handleDialogSubmit,
    handleDeleteSubmit,
  } = useFileTreeDialogs();

  useEffect(() => {
    if (location.state?.isNew && !created && !creationStartedRef.current) {
      creationStartedRef.current = true;
      
      // Clear location state from history immediately so reload doesn't trigger creation again
      navigate(location.pathname, { replace: true, state: {} });

      createProject({ id: projectId })
        .then(() => {
          setCreated(true);
        })
        .catch((err) => {
          console.error("Failed to create project:", err);
        });
    }
  }, [projectId, location.state?.isNew, created, createProject, navigate, location.pathname]);

  const { readFile } = useEditorSocket(projectId);

  const { data, isLoading, isError } = useDirectoryTreeQuery(
    projectId ?? "",
    { enabled: created }
  );

  const handleFileClick = (node: DirectoryNode) => {
    if (node.type === "file" || !node.children) {
      readFile(node.path);
    }
  };

  const handleCreateFileFromHeader = () => {
    if (data?.tree) {
      openDialog("createFile", data.tree);
    }
  };

  const handleCreateFolderFromHeader = () => {
    if (data?.tree) {
      openDialog("createFolder", data.tree);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg-editor font-sans text-text-primary selection:bg-accent/30 selection:text-white">
      <PlaygroundNavbar projectId={projectId ?? ""} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-white/[0.05] bg-bg-editor">
          {/* Explorer Header */}
          <div className="flex h-9 items-center justify-between px-3 border-b border-white/[0.04]">
            <span className="font-heading text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
              Explorer
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCreateFileFromHeader}
                disabled={!data?.tree}
                title="New File"
                className="rounded-sm p-1 text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-primary disabled:opacity-50"
              >
                <FilePlus size={14} />
              </button>
              <button
                onClick={handleCreateFolderFromHeader}
                disabled={!data?.tree}
                title="New Folder"
                className="rounded-sm p-1 text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-primary disabled:opacity-50"
              >
                <FolderPlus size={14} />
              </button>
            </div>
          </div>

          {/* Tree */}
          <div className="flex-1 overflow-hidden">
            {!created ? (
              <FileTreeSkeleton />
            ) : isLoading ? (
              <p className="p-3 font-heading text-[13px] text-text-secondary animate-pulse">
                Loading workspace...
              </p>
            ) : isError ? (
              <p className="p-3 font-heading text-[13px] text-error">
                Failed to load tree
              </p>
            ) : data?.tree ? (
              <FileTree 
                root={data.tree} 
                onFileClick={handleFileClick} 
                openDialog={openDialog}
                openDeleteDialog={openDeleteDialog}
              />
            ) : null}
          </div>
        </aside>

        {/* Editor Area */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Top Panel (Editor Split) */}
          <div className="flex-[3] flex min-h-0 min-w-0 overflow-hidden w-full">
            <div className="flex-1 flex min-w-0 overflow-hidden">
              {!created ? <EditorSkeleton /> : <PlaygroundEditor />}
            </div>
          </div>

          {/* Resize handle (Visual Decor) */}
          <div className="group h-1 w-full shrink-0 cursor-row-resize bg-white/[0.04] transition-colors hover:bg-accent/40" />

          {/* Terminal */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {!created ? <TerminalSkeleton /> : <PlaygroundTerminal />}
          </div>
        </main>
      </div>

      <FileTreeDialogs
        dialogState={dialogState}
        deleteNode={deleteNode}
        inputValue={inputValue}
        setInputValue={setInputValue}
        closeDialogs={closeDialogs}
        handleDialogSubmit={handleDialogSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
      />
    </div>
  );
};
