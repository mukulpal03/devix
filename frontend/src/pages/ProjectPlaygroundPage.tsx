import { useParams } from 'react-router-dom'

export const ProjectPlaygroundPage = () => {
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <p className="text-lg font-medium">
        playground... {projectId ? `(${projectId})` : ''}
      </p>
    </main>
  )
}
