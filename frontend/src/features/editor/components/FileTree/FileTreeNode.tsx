import { ChevronRight, ChevronDown } from "lucide-react";
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
      className="flex w-full items-center gap-2 py-1 pr-2 text-left font-sans text-[13px] cursor-pointer transition-colors duration-200 outline-none"
      style={{
        paddingLeft: `${depth * 12 + 12}px`,
        color: 'var(--text-body)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
        e.currentTarget.style.color = 'var(--text-heading)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--text-body)';
      }}
    >
      <div className="flex w-3.5 items-center justify-center" style={{ color: 'var(--text-body-muted)' }}>
        {isDirectory && (
          isOpen ? <ChevronDown size={11} strokeWidth={2} /> : <ChevronRight size={11} strokeWidth={2} />
        )}
      </div>

      {isDirectory ? (
        <FolderIcon name={node.name} size={14} className="text-body-subtle" />
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
        <ContextMenuContent
          className="min-w-[160px] p-1"
          style={{
            backgroundColor: 'var(--surface-page-base)',
            border: '1px solid var(--border-brand)',
            borderRadius: '0px',
            boxShadow: 'var(--shadow-overlay)',
            color: 'var(--text-heading)',
          }}
        >
          {isDirectory ? (
            <>
              <ContextMenuItem
                onClick={() => onContextMenuAction?.('createFile', node)}
                className="text-[13px] px-2.5 py-1.5 transition-colors duration-200"
                style={{ borderRadius: '0px' }}
              >
                New File
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => onContextMenuAction?.('createFolder', node)}
                className="text-[13px] px-2.5 py-1.5 transition-colors duration-200"
                style={{ borderRadius: '0px' }}
              >
                New Folder
              </ContextMenuItem>
              <ContextMenuSeparator style={{ backgroundColor: 'var(--border-default-subtle)' }} />
            </>
          ) : null}
          <ContextMenuItem
            onClick={() => onContextMenuAction?.('rename', node)}
            className="text-[13px] px-2.5 py-1.5 transition-colors duration-200"
            style={{ borderRadius: '0px' }}
          >
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => onContextMenuAction?.('delete', node)}
            className="text-[13px] px-2.5 py-1.5 transition-colors duration-200"
            style={{ borderRadius: '0px', color: 'var(--text-fg-danger)' }}
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
