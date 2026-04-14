import { apiClient } from './axios'
import { AxiosError } from 'axios'
import type { CreateProjectResponse, GetDirectoryTreeResponse } from '../types/project'

export const createProjectApi = async (): Promise<CreateProjectResponse> => {
  try {
    const { data } = await apiClient.post<CreateProjectResponse>('/v1/project')
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const serverMessage =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message
      throw new Error(serverMessage)
    }

    throw new Error('Failed to create project')
  }
}

export const getDirectoryTreeApi = async (
  projectId: string,
): Promise<GetDirectoryTreeResponse> => {
  try {
    const { data } = await apiClient.get<GetDirectoryTreeResponse>(
      `/v1/project/${projectId}/tree`,
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const serverMessage =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message
      throw new Error(serverMessage)
    }

    throw new Error('Failed to fetch directory tree')
  }
}

