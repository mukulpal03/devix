import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const PlaygroundTerminal = () => {
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
    term.writeln("This is a UI-only preview. Backend connection is coming soon.");
    term.write("\r\n$ ");

    // Basic local echo for demo
    const onDataDisposable = term.onData((data) => {
      // Basic handling for Enter, Backspace, and regular characters
      if (data === "\r") {
        term.write("\r\n$ ");
      } else if (data === "\u007f") {
        // Backspace
        // This is a simple UI-only echo, so we don't handle complex line editing yet
        term.write("\b \b");
      } else {
        term.write(data);
      }
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
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  return (
    <Card className="w-full flex flex-col h-full overflow-hidden bg-[#1e1e1e] border-none shadow-none">
      <CardHeader className="py-2 px-4 border-b border-white/10 bg-background/50">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Terminal
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <div ref={terminalRef} className="h-full w-full p-2" />
      </CardContent>
    </Card>
  );
};
