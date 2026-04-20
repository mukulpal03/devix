import { useParams } from "react-router-dom";
import { PlaygroundEditor } from "../components/organisms/PlaygroundEditor";
import { FileTree } from "../components/organisms/FileTree";
import { useDirectoryTreeQuery } from "../apis/queries/useDirectoryTreeQuery";
import { useEditorSocket } from "../hooks/useEditorSocket";
import type { DirectoryNode } from "../types/project";

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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r bg-muted/30">
        <p className="border-b px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Explorer
        </p>
        {isLoading && (
          <p className="px-3 py-2 text-xs text-muted-foreground">Loading...</p>
        )}
        {isError && (
          <p className="px-3 py-2 text-xs text-destructive">
            Failed to load tree
          </p>
        )}
        {data?.tree && (
          <FileTree root={data.tree} onFileClick={handleFileClick} />
        )}
      </aside>

      {/* Editor */}
      <main className="flex flex-1 flex-col overflow-hidden p-4 gap-4 bg-muted/10">
        <div className="flex-[2] overflow-hidden rounded-md border min-h-0 bg-background">
          <PlaygroundEditor />
        </div>
      </main>
    </div>
  );
};
