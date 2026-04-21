import { useState } from 'react'
import { FileTreeNode } from './FileTreeNode'
import type { DirectoryNode } from '@/types/project'
import { FileTreeDialogs } from './FileTreeDialogs'
import { useFileTreeDialogs } from '@/hooks/useFileTreeDialogs'

interface FileTreeProps {
  root: DirectoryNode
  onFileClick?: (node: DirectoryNode) => void
}

export const FileTree = ({ root, onFileClick }: FileTreeProps) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({})

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
  } = useFileTreeDialogs()

  const toggleFolder = (nodePath: string) =>
    setOpenFolders((prev) => ({ ...prev, [nodePath]: !prev[nodePath] }))

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pt-2 pb-8 scrollbar-hide">
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
  )
}
