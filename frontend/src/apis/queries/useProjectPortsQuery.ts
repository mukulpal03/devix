import { useQuery } from '@tanstack/react-query'
import { getProjectPortsApi } from '../project.api'

export const useProjectPortsQuery = (projectId: string) =>
  useQuery({
    queryKey: ['project-ports', projectId],
    queryFn: () => getProjectPortsApi(projectId),
    enabled: !!projectId,
    refetchInterval: 5000, // Refetch periodically in case container restarts
  })
