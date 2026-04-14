import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import type { DirectoryNode } from "../../types/project";
import { FileIcon, FolderIcon } from "../atoms/FileIcon";

interface FileTreeNodeProps {
  node: DirectoryNode;
  depth?: number;
  nodePath: string;
  openFolders: Record<string, boolean>;
  onToggle: (nodePath: string) => void;
  onFileClick?: (node: DirectoryNode) => void;
}

export const FileTreeNode = ({
  node,
  depth = 0,
  nodePath,
  openFolders,
  onToggle,
  onFileClick,
}: FileTreeNodeProps) => {
  const isDirectory = Array.isArray(node.children);
  const isOpen = openFolders[nodePath] ?? false;

  const handleClick = () => {
    if (isDirectory) onToggle(nodePath);
    else onFileClick?.(node);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={cn(
          "flex w-full items-center gap-1.5 py-0.5 pr-2 text-left text-sm",
          "text-muted-foreground hover:bg-muted/60 hover:text-foreground cursor-pointer transition-colors",
        )}
      >
        {isDirectory ? (
          isOpen ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )
        ) : (
          <span className="w-3.5" />
        )}

        {isDirectory ? (
          <FolderIcon name={node.name} size={16} className="shrink-0" />
        ) : (
          <FileIcon name={node.name} size={16} className="shrink-0" />
        )}

        <span className="truncate">{node.name}</span>
      </button>

      {isDirectory &&
        isOpen &&
        node.children?.map((child) => (
          <FileTreeNode
            key={child.name}
            node={child}
            depth={depth + 1}
            nodePath={`${nodePath}/${child.name}`}
            openFolders={openFolders}
            onToggle={onToggle}
            onFileClick={onFileClick}
          />
        ))}
    </div>
  );
};
