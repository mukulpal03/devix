import { useParams } from "react-router-dom";
import { PlaygroundEditor } from "@/features/editor/components/PlaygroundEditor";
import { FileTree } from "@/features/editor/components/FileTree";
import { PlaygroundTerminal } from "@/features/editor/components/PlaygroundTerminal";
import { PlaygroundNavbar } from "@/features/editor/components/PlaygroundNavbar";
import { useDirectoryTreeQuery } from "@/apis/queries/useDirectoryTreeQuery";
import { useEditorSocket } from "@/hooks/useEditorSocket";
import type { DirectoryNode } from "@/types/project";
import { FolderPlus, FilePlus } from "lucide-react";

export const ProjectPlaygroundPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { readFile } = useEditorSocket(projectId);

  const { data, isLoading, isError } = useDirectoryTreeQuery(projectId ?? "");

  const handleFileClick = (node: DirectoryNode) => {
    if (node.type === "file" || !node.children) {
      readFile(node.path);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg-editor font-sans text-text-primary selection:bg-accent/30 selection:text-white">
      <PlaygroundNavbar projectId={projectId ?? ""} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-white/6 bg-bg-editor">
          {/* Explorer Header */}
          <div className="flex h-9 items-center justify-between px-3 border-b border-white/4">
            <span className="font-heading text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
              Explorer
            </span>
            <div className="flex items-center gap-1.5">
              <button
                title="New File"
                className="rounded-sm p-1 text-text-tertiary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                <FilePlus size={14} />
              </button>
              <button
                title="New Folder"
                className="rounded-sm p-1 text-text-tertiary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                <FolderPlus size={14} />
              </button>
            </div>
          </div>

          {/* Tree */}
          <div className="flex-1 overflow-hidden">
            {isLoading && (
              <p className="p-3 font-heading text-[13px] text-text-secondary">
                Loading...
              </p>
            )}
            {isError && (
              <p className="p-3 font-heading text-[13px] text-error">
                Failed to load tree
              </p>
            )}
            {data?.tree && (
              <FileTree root={data.tree} onFileClick={handleFileClick} />
            )}
          </div>
        </aside>

        {/* Editor Area */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Editor */}
          <div className="flex-[3] flex min-h-0 overflow-hidden">
            <PlaygroundEditor />
          </div>

          {/* Resize handle (Visual Decor) */}
          <div className="group h-1 w-full shrink-0 cursor-row-resize bg-white/4 transition-colors hover:bg-accent/40" />

          {/* Terminal */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <PlaygroundTerminal />
          </div>
        </main>
      </div>
    </div>
  );
};
