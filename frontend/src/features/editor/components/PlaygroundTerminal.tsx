import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { useShellSocket } from "@/hooks/useShellSocket";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

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
        background: "#141413",
        foreground: "#FAF9F5",
        cursor: "#D97757",
        cursorAccent: "#141413",
        selectionBackground: "rgba(217, 119, 87, 0.22)",
        // ANSI colors — warm editorial palette
        black: "#141413",
        red: "#C6613F",
        green: "#788C5D",
        yellow: "#C6993F",
        blue: "#6A9BCC",
        magenta: "#C46686",
        cyan: "#BCD1CA",
        white: "#FAF9F5",
        brightBlack: "#5E5D59",
        brightRed: "#D97757",
        brightGreen: "#9DB07F",
        brightYellow: "#D9B66A",
        brightBlue: "#6A9BCC",
        brightMagenta: "#C46686",
        brightCyan: "#BCD1CA",
        brightWhite: "#FAF9F5",
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
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: 'var(--surface-feature-dark)' }}>
      {/* Terminal tab bar */}
      <div
        className="flex h-8 shrink-0 items-center justify-between px-3"
        style={{
          backgroundColor: 'var(--surface-elevated)',
          borderBottom: '1px solid var(--border-default-subtle)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-5 items-center gap-2 px-2"
            style={{
              border: '1px solid var(--border-default-subtle)',
              borderRadius: '0px',
              backgroundColor: 'var(--surface-page-base)',
            }}
          >
            <span
              className="h-[6px] w-[6px] shrink-0"
              style={{
                backgroundColor: isConnected ? '#788C5D' : '#C6613F',
                borderRadius: '0px',
              }}
            />
            <span
              className="font-mono text-[11px] font-normal uppercase tracking-[0.04em]"
              style={{ color: 'var(--text-body-muted)' }}
            >
              Terminal{!isConnected ? " (Disconnected)" : ""}
            </span>
          </div>
        </div>

        {/* + new terminal */}
        <button
          title="New Terminal"
          className="flex items-center p-1 transition-colors duration-200 cursor-pointer"
          style={{ color: 'var(--text-body-muted)', borderRadius: '0px' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-heading)'; e.currentTarget.style.backgroundColor = 'var(--surface-warm-card)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-body-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <Plus size={13} strokeWidth={1.5} />
        </button>
      </div>

      {/* xterm content — dark editorial surface */}
      <div className="relative flex-1 overflow-hidden" style={{ backgroundColor: '#141413' }}>
        <div ref={terminalRef} className="absolute inset-0 p-2" />
      </div>
    </div>
  );
};
