import { Link } from 'react-router-dom'

interface PlaygroundNavbarProps {
  projectId: string;
}

export const PlaygroundNavbar = ({ projectId }: PlaygroundNavbarProps) => {
  return (
    <header className="z-20 flex h-12 w-full shrink-0 items-center justify-between border-b border-white/[0.04] bg-bg-secondary px-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      {/* Left — Logo + Breadcrumb */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          title="Back to Home"
          className="group flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-text-secondary transition-all duration-500 hover:border-accent/20 hover:text-accent hover:scale-[1.02] active:scale-[0.96]"
          style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="transition-transform duration-500 group-hover:rotate-180">
            <rect x="2" y="2" width="7" height="7" className="fill-accent group-hover:fill-accent-warm transition-colors duration-500" />
            <rect x="11" y="2" width="7" height="7" className="fill-white/20 group-hover:fill-accent/40 transition-colors duration-500" />
            <rect x="2" y="11" width="7" height="7" className="fill-white/20 group-hover:fill-accent/40 transition-colors duration-500" />
            <rect x="11" y="11" width="7" height="7" className="fill-accent group-hover:fill-accent-warm transition-colors duration-500" />
          </svg>
        </Link>

        <div className="h-4 w-px bg-white/[0.05]" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-heading text-[12px] tracking-tight">
          <span className="text-text-tertiary">workspace</span>
          <span className="text-text-tertiary">/</span>
          <span className="rounded bg-accent/[0.06] border border-accent/10 px-2 py-0.5 font-medium text-accent">
            {projectId.slice(0, 8)}...
          </span>
        </div>
      </div>

      {/* Right — Active Session Status */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-bg-primary px-3 py-1 text-[11px] font-medium text-text-secondary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
          </span>
          Live Session
        </div>
      </div>
    </header>
  )
}
