import { useCreateProjectMutation } from '../apis/mutations/useCreateProjectMutation'

export const useCreateProject = () => {
  const mutation = useCreateProjectMutation()

  const createProject = mutation.mutateAsync

  return {
    createProject,
    isCreatingProject: mutation.isPending,
    projectError: mutation.error?.message ?? null,
  }
}
