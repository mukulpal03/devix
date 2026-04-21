import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { useShellSocket } from "@/hooks/useShellSocket";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const PlaygroundTerminal = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isConnected, sendData, onData } = useShellSocket(projectId);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontSize: 12,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', monospace",
      fontWeight: "normal",
      lineHeight: 1.5,
      theme: {
        background: "#080809",
        foreground: "#F0EEE8",
        cursor: "#3EFF9E",
        cursorAccent: "#080809",
        selectionBackground: "rgba(91,127,255,0.25)",
        // ANSI colors
        black:   "#0A0A0B",
        red:     "#FF5757",
        green:   "#2DD98F",
        yellow:  "#FFB547",
        blue:    "#5B7FFF",
        magenta: "#C792EA",
        cyan:    "#89DDFF",
        white:   "#F0EEE8",
        brightBlack:   "#6E6D6A",
        brightRed:     "#FF5757",
        brightGreen:   "#3EFF9E",
        brightYellow:  "#FFB547",
        brightBlue:    "#82AAFF",
        brightMagenta: "#A78BFA",
        brightCyan:    "#89DDFF",
        brightWhite:   "#FFFFFF",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const removeSocketListener = onData((data) => {
      term.write(data);
    });

    const onDataDisposable = term.onData((data) => {
      sendData(data);
    });

    const handleResize = () => { fitAddon.fit(); };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      onDataDisposable.dispose();
      removeSocketListener();
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg-deep">
      {/* Terminal tab bar */}
      <div className="flex h-7 shrink-0 items-center justify-between border-b border-white/5 bg-bg-deep px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 items-center gap-1.5 rounded-[3px] border border-white/6 bg-white/4 px-2">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                isConnected ? "bg-success" : "animate-pulse bg-error"
              )}
            />
            <span className="font-heading text-[12px] tracking-tight text-text-secondary">
              Terminal{!isConnected ? ' (Disconnected)' : ''}
            </span>
          </div>
        </div>

        {/* + new terminal */}
        <button
          title="New Terminal"
          className="flex items-center rounded-sm p-0.5 text-text-tertiary transition-colors hover:text-text-primary hover:bg-white/5"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* xterm content */}
      <div className="relative flex-1 overflow-hidden">
        <div ref={terminalRef} className="absolute inset-0 p-1 px-2" />
      </div>
    </div>
  );
};
