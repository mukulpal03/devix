import { useCreateProjectMutation } from '../apis/mutations/useCreateProjectMutation'

export const useCreateProject = () => {
  const mutation = useCreateProjectMutation()

  return {
    createProject: mutation.mutate,
    isCreatingProject: mutation.isPending,
    projectResult: mutation.data,
    projectError: mutation.error?.message ?? null,
  }
}
