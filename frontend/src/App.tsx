import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './app/providers/QueryProvider'
import { SocketProvider } from './app/providers/SocketProvider'
import { appRouter } from './app/router'

function App() {
  return (
    <QueryProvider>
      <SocketProvider>
        <RouterProvider router={appRouter} />
      </SocketProvider>
    </QueryProvider>
  )
}

export default App
