import { useMutation } from '@tanstack/react-query'
import { createProjectApi } from '../project.api'

export const useCreateProjectMutation = () =>
  useMutation({
    mutationKey: ['create-project'],
    mutationFn: createProjectApi,
  })
