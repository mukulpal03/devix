export interface CreateProjectResponse {
  message: string
  id: string
}

export interface DirectoryNode {
  path: string
  name: string
  size?: number
  type?: 'directory' | 'file'
  extension?: string
  children?: DirectoryNode[]
}

export interface GetDirectoryTreeResponse {
  message: string
  tree: DirectoryNode
}
