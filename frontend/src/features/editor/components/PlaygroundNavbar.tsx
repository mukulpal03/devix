import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Square, ExternalLink } from "lucide-react";
import { shellSocket } from "@/lib/socket";

interface PlaygroundNavbarProps {
  projectId: string;
  isReady: boolean;
}

export const PlaygroundNavbar = ({ projectId, isReady }: PlaygroundNavbarProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
  const url = new URL(apiBaseUrl);
  const baseHost = url.host;
  const protocol = url.protocol;
  const previewUrl = `${protocol}//${projectId}.${baseHost}`;

  const handleRun = () => {
    // Send Ctrl+C to kill any running process, then clear the line, then run pnpm dev
    shellSocket.emit("terminalData", "\x03");
    setTimeout(() => {
      shellSocket.emit("terminalData", "npm run dev\r");
      setIsRunning(true);
    }, 100);
  };

  const handleStop = () => {
    // Send Ctrl+C
    shellSocket.emit("terminalData", "\x03");
    setIsRunning(false);
  };

  return (
    <header
      className="z-20 flex h-12 w-full shrink-0 items-center justify-between px-4"
      style={{
        backgroundColor: "var(--surface-page-base)",
        borderBottom: "1px solid var(--border-default-subtle)",
        boxShadow: "none",
      }}
    >
      {/* Left — Logo + Breadcrumb */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          title="Back to Home"
          className="font-heading text-[16px] font-bold tracking-tight transition-colors duration-200"
          style={{
            color: "var(--text-heading)",
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          devix
        </Link>

        <div
          className="h-4 w-px"
          style={{ backgroundColor: "var(--border-default-subtle)" }}
        />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-sans text-[14px]">
          <span style={{ color: "var(--text-body-muted)" }}>workspace</span>
          <span style={{ color: "var(--text-body-muted)" }}>/</span>
          <span
            className="font-medium px-2 py-0.5"
            style={{
              color: "var(--text-heading)",
              backgroundColor: "var(--surface-elevated)",
              border: "1px solid var(--border-default-subtle)",
              borderRadius: "0px",
            }}
          >
            {projectId.slice(0, 8)}...
          </span>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {isReady && (
          <div
            className="flex items-center overflow-hidden"
            style={{
              border: "1px solid var(--border-default-subtle)",
              borderRadius: "4px",
              backgroundColor: "var(--surface-elevated)",
            }}
          >
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
              style={{
                color: "var(--text-body-muted)",
                borderRight: "1px solid var(--border-default-subtle)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-heading)";
                e.currentTarget.style.backgroundColor =
                  "var(--surface-warm-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-body-muted)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Play size={13} fill="currentColor" strokeWidth={0} /> Run
            </button>
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
              style={{ color: "var(--text-body-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-heading)";
                e.currentTarget.style.backgroundColor =
                  "var(--surface-warm-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-body-muted)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Square size={13} fill="currentColor" strokeWidth={0} /> Stop
            </button>
            {isRunning && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-3 py-1.5 transition-colors"
                style={{
                  borderLeft: "1px solid var(--border-default-subtle)",
                  color: "var(--text-body-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-heading)";
                  e.currentTarget.style.backgroundColor = "var(--surface-warm-card)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-body-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Open Preview in New Tab"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
