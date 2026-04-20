import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useShellSocket } from "../../hooks/useShellSocket";
import { useParams } from "react-router-dom";

export const PlaygroundTerminal = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isConnected, sendData, onData } = useShellSocket(projectId);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize Terminal
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "'Geist Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
        cursor: "#ffffff",
        selectionBackground: "rgba(255, 255, 255, 0.3)",
      },
    });

    // Initialize Fit Addon
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // Open terminal in the ref
    term.open(terminalRef.current);
    fitAddon.fit();

    // Store refs for cleanup and resizing
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Welcome message
    term.writeln("\x1b[1;32mWelcome to the Project Playground Terminal!\x1b[0m");
    term.writeln("Backend connection established.");
    term.write("\r\n$ ");

    // Pipe socket data to terminal
    const removeSocketListener = onData((data) => {
      term.write(data);
    });

    // Pipe terminal input to socket
    const onDataDisposable = term.onData((data) => {
      sendData(data);
    });

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
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
    <Card className="w-full flex flex-col h-full overflow-hidden bg-[#1e1e1e] border-none shadow-none">
      <CardHeader className="py-2 px-4 border-b border-white/10 bg-background/50">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
          Terminal {isConnected ? "" : "(Disconnected)"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <div ref={terminalRef} className="h-full w-full p-2" />
      </CardContent>
    </Card>
  );
};
