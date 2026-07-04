import { useQuery } from '@tanstack/react-query'
import { getDirectoryTreeApi } from '../project.api'

export const useDirectoryTreeQuery = (projectId: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ['directory-tree', projectId],
    queryFn: () => getDirectoryTreeApi(projectId),
    enabled: !!projectId && (options?.enabled !== false),
  })
