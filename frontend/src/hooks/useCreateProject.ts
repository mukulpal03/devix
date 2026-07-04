import { useIsMutating } from '@tanstack/react-query'
import { useCreateProjectMutation } from '../apis/mutations/useCreateProjectMutation'

export const useCreateProject = () => {
  const mutation = useCreateProjectMutation()
  const mutatingCount = useIsMutating({ mutationKey: ['create-project'] })

  const createProject = mutation.mutateAsync

  return {
    createProject,
    isCreatingProject: mutatingCount > 0,
    projectError: mutation.error?.message ?? null,
  }
}
