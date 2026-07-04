import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { useShellSocket } from "@/hooks/useShellSocket";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const PlaygroundTerminal = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isConnected, reconnectCount, sendData, onData } =
    useShellSocket(projectId);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const lastReconnectCount = useRef(reconnectCount);

  useEffect(() => {
    if (reconnectCount > lastReconnectCount.current) {
      if (xtermRef.current) {
        xtermRef.current.write(
          "\r\n\x1b[33m--- Reconnected to server (New Session) ---\x1b[0m\r\n",
        );
      }
      lastReconnectCount.current = reconnectCount;
    }
  }, [reconnectCount]);

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
        background: "#050505",
        foreground: "#EAEAF0",
        cursor: "#10B981",
        cursorAccent: "#050505",
        selectionBackground: "rgba(16,185,129,0.22)",
        // ANSI colors
        black: "#0A0A0F",
        red: "#EF4444",
        green: "#10B981",
        yellow: "#FBBF24",
        blue: "#34D399",
        magenta: "#6EE7B7",
        cyan: "#A7F3D0",
        white: "#EAEAF0",
        brightBlack: "#484860",
        brightRed: "#EF4444",
        brightGreen: "#34D399",
        brightYellow: "#FBBF24",
        brightBlue: "#6EE7B7",
        brightMagenta: "#A7F3D0",
        brightCyan: "#EAEAF0",
        brightWhite: "#FFFFFF",
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

    const handleResize = () => {
      fitAddon.fit();
    };
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
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg-primary">
      {/* Terminal tab bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-white/[0.04] bg-bg-deep px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 items-center gap-1.5 rounded-[4px] border border-white/[0.05] bg-white/[0.01] px-2">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                isConnected ? "bg-success" : "animate-pulse bg-error",
              )}
            />
            <span className="font-heading text-[11px] tracking-wide text-text-secondary font-medium uppercase">
              Terminal{!isConnected ? " (Disconnected)" : ""}
            </span>
          </div>
        </div>

        {/* + new terminal */}
        <button
          title="New Terminal"
          className="flex items-center rounded p-1 text-text-tertiary transition-all duration-300 hover:text-text-primary hover:bg-white/[0.04] active:scale-[0.95]"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* xterm content */}
      <div className="relative flex-1 overflow-hidden bg-bg-primary">
        <div ref={terminalRef} className="absolute inset-0 p-2" />
      </div>
    </div>
  );
};
