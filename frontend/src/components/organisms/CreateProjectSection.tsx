import { Alert } from '../ui/alert'
import { CreateProjectCard } from '../molecules/CreateProjectCard'
import { useCreateProject } from '../../hooks/useCreateProject'

export const CreateProjectSection = () => {
  const { createProject, isCreatingProject, projectResult, projectError } =
    useCreateProject()

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <CreateProjectCard
        isLoading={isCreatingProject}
        onCreateProject={createProject}
      />

      {projectResult ? (
        <Alert variant="success">
          {projectResult.message}. Project ID: <strong>{projectResult.id}</strong>
        </Alert>
      ) : null}

      {projectError ? (
        <Alert variant="destructive">
          {projectError}
        </Alert>
      ) : null}
    </section>
  )
}
