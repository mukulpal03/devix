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
  <div className="flex flex-col gap-3 p-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="flex items-center gap-2 animate-pulse"
        style={{
          animationDelay: `${i * 100}ms`,
        }}
      >
        <div
          className={`h-3 ${i % 3 === 0 ? "w-3.5" : "w-4"}`}
          style={{
            backgroundColor: "var(--border-default-subtle)",
            borderRadius: "0px",
            opacity: 0.35,
          }}
        />
        <div
          className={`h-2.5 ${i === 1 ? "w-24" : i === 2 ? "w-32" : i === 3 ? "w-16" : "w-28"}`}
          style={{
            backgroundColor: "var(--border-default-subtle)",
            borderRadius: "0px",
            opacity: 0.35,
          }}
        />
      </div>
    ))}
  </div>
);

const ThemeLoader = () => (
  <div
    className="relative flex h-14 w-14 items-center justify-center border"
    style={{
      borderColor: "var(--border-brand)",
      backgroundColor: "var(--surface-page-base)",
      borderRadius: "0px",
    }}
  >
    <div
      className="h-6 w-6 border animate-spin"
      style={{
        borderColor: "var(--accent-clay)",
        borderRadius: "0px",
        animationDuration: "3s",
        animationDirection: "reverse",
      }}
    />
    <div
      className="absolute h-3 w-3 animate-spin"
      style={{
        backgroundColor: "var(--accent-clay)",
        borderRadius: "0px",
        animationDuration: "1.5s",
      }}
    />
  </div>
);

const EditorSkeleton = () => (
  <div
    className="flex h-full w-full flex-col items-center justify-center select-none"
    style={{
      backgroundColor: "var(--surface-page-base)",
      color: "var(--text-body-subtle)",
    }}
  >
    <div className="flex flex-col items-center gap-5">
      <ThemeLoader />
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span
          className="text-[15px] font-medium"
          style={{ color: "var(--text-heading)" }}
        >
          Spinning up sandbox environment...
        </span>
        <span
          className="text-[14px]"
          style={{ color: "var(--text-body-muted)" }}
        >
          Configuring workspace volumes
        </span>
      </div>
    </div>
  </div>
);

const TerminalSkeleton = () => (
  <div
    className="flex h-full w-full flex-col overflow-hidden"
    style={{ backgroundColor: "#141413" }}
  >
    {/* Terminal tab bar */}
    <div
      className="flex h-8 shrink-0 items-center justify-between px-3"
      style={{
        backgroundColor: "var(--surface-elevated)",
        borderBottom: "1px solid var(--border-default-subtle)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-5 items-center gap-2 px-2"
          style={{
            border: "1px solid var(--border-default-subtle)",
            borderRadius: "0px",
            backgroundColor: "var(--surface-page-base)",
          }}
        >
          <span
            className="h-[6px] w-[6px] shrink-0"
            style={{
              backgroundColor: "#C6613F", // disconnected red status
              borderRadius: "0px",
            }}
          />
          <span
            className="font-mono text-[11px] font-normal uppercase tracking-[0.04em]"
            style={{ color: "var(--text-body-muted)" }}
          >
            Terminal (Connecting...)
          </span>
        </div>
      </div>
    </div>

    {/* xterm content skeleton */}
    <div
      className="flex-1 p-4 font-mono text-[11px] leading-relaxed select-none"
      style={{ backgroundColor: "#141413", color: "#87867F" }}
    >
      <div
        className="flex items-center gap-2 mb-3"
        style={{ color: "#87867F" }}
      >
        <span
          className="h-[3px] w-[3px]"
          style={{ backgroundColor: "#D97757" }}
        />
        <span className="font-mono font-normal uppercase text-[10px] tracking-[0.04em]">
          Bootstrapping
        </span>
      </div>
      <div
        className="flex flex-col gap-1.5"
        style={{ color: "rgba(250, 249, 245, 0.45)" }}
      >
        <div className="flex items-center gap-1.5 animate-pulse">
          <span className="text-[#788C5D]">&gt;</span>
          <span>Preparing build environment...</span>
        </div>
        <div
          className="flex items-center gap-1.5 animate-pulse"
          style={{ animationDelay: "150ms" }}
        >
          <span className="text-[#87867F]">...</span>
          <span>Loading workspace volumes...</span>
        </div>
        <div
          className="flex items-center gap-1.5 animate-pulse"
          style={{ animationDelay: "300ms" }}
        >
          <span className="text-[#87867F]">...</span>
          <span>Establishing secure shell tunnel...</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#FAF9F5]/40">
            Waiting for sandbox terminal socket connection
          </span>
          <span className="inline-block w-1.5 h-3 bg-[#FAF9F5]/40 animate-blink ml-1" />
        </div>
      </div>
    </div>
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
  }, [
    projectId,
    location.state?.isNew,
    created,
    createProject,
    navigate,
    location.pathname,
  ]);

  const { readFile } = useEditorSocket(projectId);

  const { data, isLoading, isError } = useDirectoryTreeQuery(projectId ?? "", {
    enabled: created,
  });

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
    <div
      className="flex h-screen flex-col overflow-hidden font-sans"
      style={{
        backgroundColor: "var(--surface-page-base)",
        color: "var(--text-heading)",
      }}
    >
      <PlaygroundNavbar projectId={projectId ?? ""} isReady={created} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — warm ivory surface */}
        <aside
          className="flex w-60 shrink-0 flex-col"
          style={{
            backgroundColor: "var(--surface-page-base)",
            borderRight: "1px solid var(--border-default-subtle)",
          }}
        >
          {/* Explorer Header */}
          <div
            className="flex h-10 items-center justify-between px-4"
            style={{
              backgroundColor: "var(--surface-elevated)",
              borderBottom: "1px solid var(--border-default-subtle)",
            }}
          >
            <span
              className="font-mono text-[10px] font-normal uppercase tracking-[0.04em]"
              style={{ color: "var(--text-body-muted)" }}
            >
              Explorer
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateFileFromHeader}
                disabled={!data?.tree}
                title="New File"
                className="p-1 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                style={{ color: "var(--text-body-muted)", borderRadius: "0px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-heading)";
                  e.currentTarget.style.backgroundColor =
                    "var(--surface-warm-card)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-body-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FilePlus size={13} strokeWidth={1.5} />
              </button>
              <button
                onClick={handleCreateFolderFromHeader}
                disabled={!data?.tree}
                title="New Folder"
                className="p-1 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                style={{ color: "var(--text-body-muted)", borderRadius: "0px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-heading)";
                  e.currentTarget.style.backgroundColor =
                    "var(--surface-warm-card)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-body-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FolderPlus size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Tree */}
          <div className="flex-1 overflow-hidden">
            {!created ? (
              <FileTreeSkeleton />
            ) : isLoading ? (
              <p
                className="p-4 font-sans text-[14px]"
                style={{ color: "var(--text-body-muted)" }}
              >
                Loading workspace tree...
              </p>
            ) : isError ? (
              <p
                className="p-4 font-sans text-[14px] font-medium"
                style={{ color: "var(--text-fg-danger)" }}
              >
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
        <main
          className="flex min-w-0 flex-1 flex-col overflow-hidden"
          style={{ backgroundColor: "var(--surface-page-base)" }}
        >
          {/* Top Panel (Editor Split) */}
          <div
            className="flex-[3] flex min-h-0 min-w-0 overflow-hidden w-full"
            style={{ borderBottom: "1px solid var(--border-default-subtle)" }}
          >
            <div className="flex-1 flex min-w-0 overflow-hidden">
              {!created ? <EditorSkeleton /> : <PlaygroundEditor />}
            </div>
          </div>

          {/* Resize handle */}
          <div
            className="h-[1px] w-full shrink-0"
            style={{ backgroundColor: "var(--border-default-subtle)" }}
          />

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
