import { FileTreeNode } from './FileTreeNode'
import type { DirectoryNode } from '@/types/project'
import { useFileTreeToggle } from '@/hooks/useFileTreeToggle'
import type { DialogType } from '@/features/editor/components/FileTree/FileTreeDialogs'

interface FileTreeProps {
  root: DirectoryNode
  onFileClick?: (node: DirectoryNode) => void
  openDialog: (type: DialogType, node: DirectoryNode) => void
  openDeleteDialog: (node: DirectoryNode) => void
}

export const FileTree = ({ root, onFileClick, openDialog, openDeleteDialog }: FileTreeProps) => {
  const { openFolders, toggleFolder } = useFileTreeToggle()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pt-3 pb-8 scrollbar-hide">
        {root.children?.map((node) => (
          <FileTreeNode
            key={node.name}
            node={node}
            nodePath={node.name}
            openFolders={openFolders}
            onToggle={toggleFolder}
            onFileClick={onFileClick}
            onContextMenuAction={(action, targetNode) => {
              if (action === 'delete') {
                openDeleteDialog(targetNode)
              } else {
                openDialog(action, targetNode)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
