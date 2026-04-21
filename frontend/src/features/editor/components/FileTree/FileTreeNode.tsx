import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DirectoryNode } from "@/types/project";
import { FileIcon, FolderIcon } from "./FileIcon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface FileTreeNodeProps {
  node: DirectoryNode;
  depth?: number;
  nodePath: string;
  openFolders: Record<string, boolean>;
  onToggle: (nodePath: string) => void;
  onFileClick?: (node: DirectoryNode) => void;
  onContextMenuAction?: (action: 'rename' | 'createFile' | 'createFolder' | 'delete', node: DirectoryNode) => void;
}

export const FileTreeNode = ({
  node,
  depth = 0,
  nodePath,
  openFolders,
  onToggle,
  onFileClick,
  onContextMenuAction,
}: FileTreeNodeProps) => {
  const isDirectory = Array.isArray(node.children);
  const isOpen = openFolders[nodePath] ?? false;

  const handleClick = () => {
    if (isDirectory) onToggle(nodePath);
    else onFileClick?.(node);
  };

  const TreeElement = (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center gap-1.5 py-0.5 pr-2 text-left text-[13px] font-heading",
        "text-text-secondary hover:bg-white/4 hover:text-text-primary cursor-pointer transition-colors outline-none",
      )}
      style={{ paddingLeft: `${depth * 12 + 12}px` }}
    >
      <div className="flex w-3.5 items-center justify-center">
        {isDirectory && (
          isOpen ? <ChevronDown size={12} strokeWidth={2.5} /> : <ChevronRight size={12} strokeWidth={2.5} />
        )}
      </div>

      {isDirectory ? (
        <FolderIcon name={node.name} size={15} />
      ) : (
        <FileIcon name={node.name} size={15} />
      )}

      <span className="truncate">{node.name}</span>
    </button>
  );

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>{TreeElement}</ContextMenuTrigger>
        <ContextMenuContent className="min-w-[160px] bg-bg-elevated border-white/8 text-text-primary">
          {isDirectory ? (
            <>
              <ContextMenuItem onClick={() => onContextMenuAction?.('createFile', node)} className="text-[13px]">
                New File
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onContextMenuAction?.('createFolder', node)} className="text-[13px]">
                New Folder
              </ContextMenuItem>
              <ContextMenuSeparator className="bg-white/5" />
            </>
          ) : null}
          <ContextMenuItem onClick={() => onContextMenuAction?.('rename', node)} className="text-[13px]">
            Rename
          </ContextMenuItem>
          <ContextMenuItem 
            onClick={() => onContextMenuAction?.('delete', node)} 
            className="text-[13px] text-error focus:text-error focus:bg-error/10"
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

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
            onContextMenuAction={onContextMenuAction}
          />
        ))}
    </div>
  );
};
