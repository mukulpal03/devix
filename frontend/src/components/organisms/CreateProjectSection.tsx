import { Alert } from '../ui/alert'
import { CreateProjectCard } from '../molecules/CreateProjectCard'
import { useCreateProject } from '../../hooks/useCreateProject'
import { useNavigate } from 'react-router-dom'

export const CreateProjectSection = () => {
  const { createProject, isCreatingProject, projectError } = useCreateProject()
  const navigate = useNavigate()

  const handleCreateProject = async () => {
    const response = await createProject()
    navigate(`/project/${response.id}`)
  }

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <CreateProjectCard
        isLoading={isCreatingProject}
        onCreateProject={() => void handleCreateProject()}
      />

      {projectError ? (
        <Alert variant="destructive">
          {projectError}
        </Alert>
      ) : null}
    </section>
  )
}
