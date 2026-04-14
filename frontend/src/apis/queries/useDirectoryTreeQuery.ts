import { useQuery } from '@tanstack/react-query'
import { getDirectoryTreeApi } from '../project.api'

export const useDirectoryTreeQuery = (projectId: string) =>
  useQuery({
    queryKey: ['directory-tree', projectId],
    queryFn: () => getDirectoryTreeApi(projectId),
    enabled: !!projectId,
  })
