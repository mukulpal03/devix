import { Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'

export const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
            <Terminal className="h-5 w-5" />
            <span className="font-bold sm:inline-block">
              devix
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 shadow-sm">
          <nav className="flex items-center space-x-1">
            {/* Nav links can be added here */}
          </nav>
        </div>
      </div>
    </header>
  )
}
