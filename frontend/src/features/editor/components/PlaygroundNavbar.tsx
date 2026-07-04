import { Link } from 'react-router-dom'

interface PlaygroundNavbarProps {
  projectId: string;
}

export const PlaygroundNavbar = ({ projectId }: PlaygroundNavbarProps) => {
  return (
    <header className="z-20 flex h-10 w-full shrink-0 items-center justify-between border-b border-white/[0.06] bg-bg-primary px-3">
      {/* Left — Logo + Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          title="Back to Home"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="7" height="7" className="fill-accent" />
            <rect x="11" y="2" width="7" height="7" className="fill-accent/40" />
            <rect x="2" y="11" width="7" height="7" className="fill-accent/40" />
            <rect x="11" y="11" width="7" height="7" className="fill-accent" />
          </svg>
        </Link>

        <div className="h-4 w-px bg-white/[0.06]" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 font-heading text-[13px]">
          <span className="text-text-secondary">workspace</span>
          <span className="text-text-tertiary">/</span>
          <span className="text-text-primary">{projectId.slice(0, 8)}...</span>
        </div>
      </div>

      {/* Right — Empty */}
      <div />
    </header>
  )
}
