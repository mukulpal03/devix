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
        "flex w-full items-center gap-2 py-1 pr-2 text-left text-[12px] font-heading",
        "text-text-secondary hover:bg-white/[0.02] hover:text-text-primary cursor-pointer transition-all duration-300 outline-none",
      )}
      style={{ paddingLeft: `${depth * 12 + 12}px` }}
    >
      <div className="flex w-3.5 items-center justify-center text-text-tertiary">
        {isDirectory && (
          isOpen ? <ChevronDown size={11} strokeWidth={2.5} /> : <ChevronRight size={11} strokeWidth={2.5} />
        )}
      </div>

      {isDirectory ? (
        <FolderIcon name={node.name} size={14} className="text-accent" />
      ) : (
        <FileIcon name={node.name} size={14} />
      )}

      <span className="truncate font-medium">{node.name}</span>
    </button>
  );

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>{TreeElement}</ContextMenuTrigger>
        <ContextMenuContent className="min-w-[160px] bg-bg-elevated border border-white/[0.04] text-text-primary rounded-lg p-1 shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
          {isDirectory ? (
            <>
              <ContextMenuItem onClick={() => onContextMenuAction?.('createFile', node)} className="text-[12px] px-2.5 py-1.5 focus:bg-white/[0.04] rounded-md transition-all duration-200">
                New File
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onContextMenuAction?.('createFolder', node)} className="text-[12px] px-2.5 py-1.5 focus:bg-white/[0.04] rounded-md transition-all duration-200">
                New Folder
              </ContextMenuItem>
              <ContextMenuSeparator className="bg-white/[0.04] my-1" />
            </>
          ) : null}
          <ContextMenuItem onClick={() => onContextMenuAction?.('rename', node)} className="text-[12px] px-2.5 py-1.5 focus:bg-white/[0.04] rounded-md transition-all duration-200">
            Rename
          </ContextMenuItem>
          <ContextMenuItem 
            onClick={() => onContextMenuAction?.('delete', node)} 
            className="text-[12px] px-2.5 py-1.5 text-error focus:text-white focus:bg-error/80 rounded-md transition-all duration-200"
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
