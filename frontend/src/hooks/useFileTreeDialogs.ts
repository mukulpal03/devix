import { useState } from 'react'
import type { FormEvent } from 'react'
import type { DirectoryNode } from '../types/project'
import type { DialogType } from '@/features/editor/components/FileTree/FileTreeDialogs'
import { editorSocket } from '../lib/socket'

export const useFileTreeDialogs = () => {
  const [dialogState, setDialogState] = useState<{ type: DialogType; node: DirectoryNode | null }>({ type: null, node: null })
  const [deleteNode, setDeleteNode] = useState<DirectoryNode | null>(null)
  const [inputValue, setInputValue] = useState('')

  const openDialog = (type: DialogType, node: DirectoryNode) => {
    setDialogState({ type, node })
    setInputValue(type === 'rename' ? node.name : '')
  }

  const openDeleteDialog = (node: DirectoryNode) => {
    setDeleteNode(node)
  }

  const closeDialogs = () => {
    setDialogState({ type: null, node: null })
    setDeleteNode(null)
    setInputValue('')
  }

  const handleDialogSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !dialogState.node) return

    const { type, node } = dialogState

    if (type === 'createFile') {
      editorSocket.emit('createFile', { pathToFileOrDir: `${node.path}/${inputValue}` })
    } else if (type === 'createFolder') {
      editorSocket.emit('createDirectory', { pathToFileOrDir: `${node.path}/${inputValue}` })
    } else if (type === 'rename') {
      const parentPath = node.path.substring(0, node.path.lastIndexOf('/'))
      const newPath = `${parentPath}/${inputValue}`
      const eventName = node.type === 'directory' ? 'renameDirectory' : 'renameFile'
      editorSocket.emit(eventName, { pathToFileOrDir: node.path, newPath })
    }

    closeDialogs()
  }

  const handleDeleteSubmit = () => {
    if (!deleteNode) return
    
    const eventName = deleteNode.type === 'directory' ? 'deleteDirectory' : 'deleteFile'
    editorSocket.emit(eventName, { pathToFileOrDir: deleteNode.path })

    closeDialogs()
  }

  return {
    dialogState,
    deleteNode,
    inputValue,
    setInputValue,
    openDialog,
    openDeleteDialog,
    closeDialogs,
    handleDialogSubmit,
    handleDeleteSubmit,
  }
}
