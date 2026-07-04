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
  <div className="flex flex-col gap-3 p-4 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`h-3 rounded-md bg-white/[0.03] ${i % 3 === 0 ? 'w-3.5' : 'w-4'}`} />
        <div className={`h-2.5 rounded bg-white/[0.03] ${i === 1 ? 'w-24' : i === 2 ? 'w-32' : i === 3 ? 'w-16' : 'w-28'}`} />
      </div>
    ))}
  </div>
);

const EditorSkeleton = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-bg-primary text-text-secondary select-none relative overflow-hidden">
    <div className="dot-grid absolute inset-0 z-0 opacity-20 pointer-events-none" />
    <div className="relative z-10 flex flex-col items-center gap-5">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/[0.04] bg-white/[0.01] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex h-full w-full items-center justify-center rounded-[16px] bg-bg-card-inner border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
          <div className="absolute inset-0 rounded-[16px] border-t-2 border-accent animate-spin" style={{ animationDuration: "1.2s" }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent animate-pulse-dot">
            <path d="M6 8L10 12L6 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 16H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="text-[13px] font-semibold tracking-tight text-text-primary">Spinning up sandbox environment...</span>
        <span className="text-[11px] text-text-tertiary">Configuring workspace volumes</span>
      </div>
    </div>
  </div>
);

const TerminalSkeleton = () => (
  <div className="flex-1 bg-bg-deep p-4 font-mono text-[11px] leading-relaxed text-text-secondary select-none relative">
    <div className="flex items-center gap-2 text-text-tertiary mb-2">
      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      <span className="font-semibold tracking-tight uppercase text-[9px]">Bootstrapping</span>
    </div>
    <div className="text-white/10 font-medium">Waiting for sandbox terminal socket connection...</div>
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
    <div className="flex h-screen flex-col overflow-hidden bg-bg-primary font-sans text-text-primary selection:bg-accent/20 selection:text-white">
      <PlaygroundNavbar projectId={projectId ?? ""} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-white/[0.04] bg-bg-secondary">
          {/* Explorer Header */}
          <div className="flex h-10 items-center justify-between px-4 border-b border-white/[0.04] bg-bg-deep">
            <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
              Explorer
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateFileFromHeader}
                disabled={!data?.tree}
                title="New File"
                className="rounded p-1 text-text-tertiary transition-all duration-300 hover:bg-white/[0.04] hover:text-text-primary active:scale-[0.95] disabled:opacity-50"
              >
                <FilePlus size={13} />
              </button>
              <button
                onClick={handleCreateFolderFromHeader}
                disabled={!data?.tree}
                title="New Folder"
                className="rounded p-1 text-text-tertiary transition-all duration-300 hover:bg-white/[0.04] hover:text-text-primary active:scale-[0.95] disabled:opacity-50"
              >
                <FolderPlus size={13} />
              </button>
            </div>
          </div>

          {/* Tree */}
          <div className="flex-1 overflow-hidden">
            {!created ? (
              <FileTreeSkeleton />
            ) : isLoading ? (
              <p className="p-4 font-heading text-[12px] text-text-secondary animate-pulse">
                Loading workspace tree...
              </p>
            ) : isError ? (
              <p className="p-4 font-heading text-[12px] text-error font-medium">
                Failed to load workspace
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
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-bg-primary">
          {/* Top Panel (Editor Split) */}
          <div className="flex-[3] flex min-h-0 min-w-0 overflow-hidden w-full border-b border-white/[0.04]">
            <div className="flex-1 flex min-w-0 overflow-hidden bg-bg-primary">
              {!created ? <EditorSkeleton /> : <PlaygroundEditor />}
            </div>
          </div>

          {/* Resize handle (Visual Decor) */}
          <div className="h-[2px] w-full shrink-0 bg-white/[0.04] relative z-10" />

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
