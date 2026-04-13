import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { ProjectPlaygroundPage } from '../../pages/ProjectPlaygroundPage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/project/:projectId',
    element: <ProjectPlaygroundPage />,
  },
])
