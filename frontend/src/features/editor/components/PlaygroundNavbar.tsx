import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Share2, Settings, Play, Square, PanelRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { shellSocket } from '@/lib/socket'

interface PlaygroundNavbarProps {
  projectId: string;
  isBrowserOpen: boolean;
  toggleBrowser: () => void;
}

export const PlaygroundNavbar = ({ projectId, isBrowserOpen, toggleBrowser }: PlaygroundNavbarProps) => {
  const [status, setStatus] = useState<'ready' | 'running'>('ready')

  const handleRun = () => {
    if (shellSocket.connected) {
      // Pass --host so Vite (and similar servers) bind to 0.0.0.0 inside the container,
      // allowing Docker to route external traffic to it.
      shellSocket.emit("terminalData", "npm run dev -- --host\r");
      setStatus('running');
    }
  };

  const handleStop = () => {
    if (shellSocket.connected) {
      shellSocket.emit("terminalData", "\x03"); // Ctrl+C
      setStatus('ready');
    }
  };

  return (
    <header className="z-20 flex h-10 w-full shrink-0 items-center justify-between border-b border-white/7 bg-bg-primary px-3">
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

        <div className="h-4 w-px bg-white/7" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 font-heading text-[13px]">
          <span className="text-text-secondary">workspace</span>
          <span className="text-text-tertiary">/</span>
          <span className="text-text-primary">{projectId.slice(0, 8)}...</span>
        </div>
      </div>

      {/* Center — Run + Status */}
      <div className="flex items-center gap-2.5">
        {status === 'ready' ? (
          <Button
            size="sm"
            onClick={handleRun}
            className="h-7 rounded-[4px] bg-accent px-3 text-[12px] font-medium text-white transition-opacity hover:opacity-90 border-none gap-1.5"
          >
            <Play size={12} fill="white" />
            Run
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleStop}
            className="h-7 rounded-[4px] bg-error/90 px-3 text-[12px] font-medium text-white transition-opacity hover:opacity-100 border-none gap-1.5"
          >
            <Square size={12} fill="white" />
            Stop
          </Button>
        )}

        <div className="flex items-center gap-1.5 font-heading text-[11px]">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              status === 'running' ? "bg-success" : "bg-text-secondary"
            )}
          />
          <span className={status === 'running' ? "text-success" : "text-text-secondary"}>
            {status === 'running' ? 'Running' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Right — Share + Avatar + Settings */}
      <div className="flex items-center gap-2">
        {/* Toggle Browser */}
        <button
          onClick={toggleBrowser}
          title="Toggle Browser Preview"
          className={cn(
            "flex items-center p-1.5 rounded-md transition-colors",
            isBrowserOpen ? "bg-white/10 text-text-primary" : "text-text-tertiary hover:bg-white/5 hover:text-text-primary"
          )}
        >
          <PanelRight size={14} />
        </button>

        {/* Share */}
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 rounded-[4px] border-white/10 bg-transparent px-2.5 text-[12px] text-text-secondary transition-all hover:border-white/20 hover:text-text-primary"
        >
          <Share2 size={12} />
          Share
        </Button>

        {/* User avatar */}
        <div className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent font-heading text-[10px] font-medium text-white transition-opacity hover:opacity-90">
          U
        </div>

        {/* Settings */}
        <button
          title="Settings"
          className="flex items-center p-1 text-text-tertiary transition-colors hover:text-text-primary"
        >
          <Settings size={14} />
        </button>
      </div>
    </header>
  )
}
