import { useState, useEffect } from "react";
import { useProjectPortsQuery } from "@/apis/queries/useProjectPortsQuery";
import { RefreshCw, ExternalLink, Globe, ServerCrash } from "lucide-react";

interface BrowserPreviewProps {
  projectId: string;
}

export const BrowserPreview = ({ projectId }: BrowserPreviewProps) => {
  const { data, isLoading } = useProjectPortsQuery(projectId);
  const ports = data?.ports || {};
  
  // Available container ports to map (default order).
  const availablePorts = Object.keys(ports).sort();
  const defaultPort = availablePorts.includes("3000") ? "3000" : (availablePorts.includes("5173") ? "5173" : availablePorts[0]);
  
  const [selectedPort, setSelectedPort] = useState<string>(defaultPort || "3000");
  const [path, setPath] = useState<string>("/");
  const [key, setKey] = useState<number>(0); // Used to force iframe reload
  const [isServerUp, setIsServerUp] = useState<boolean>(false);

  // Update selected port if ports load and current isn't in there but we have a default
  useEffect(() => {
    if (defaultPort && !availablePorts.includes(selectedPort)) {
      setSelectedPort(defaultPort);
    }
  }, [defaultPort, availablePorts, selectedPort]);

  const mappedPort = ports[selectedPort];
  const url = mappedPort ? `http://localhost:${mappedPort}${path.startsWith('/') ? path : '/' + path}` : "";

  // Poll the url to see if the server is actually running before showing the iframe
  useEffect(() => {
    if (!url) {
      setIsServerUp(false);
      return;
    }

    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkServer = async () => {
      try {
        await fetch(url, { mode: 'no-cors' });
        if (mounted) setIsServerUp(true);
      } catch (err) {
        if (mounted) {
          setIsServerUp(false);
          timeoutId = setTimeout(checkServer, 1000);
        }
      }
    };

    checkServer();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [url, key]);

  // Attempt to auto-detect the active port among all mapped ports
  useEffect(() => {
    if (isServerUp || availablePorts.length === 0) return;

    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const detectActivePort = async () => {
      const checks = availablePorts.map(async (port) => {
        const mapped = ports[port];
        if (!mapped) throw new Error();
        const testUrl = `http://localhost:${mapped}/`;
        try {
          await fetch(testUrl, { mode: 'no-cors' });
          return port;
        } catch {
          throw new Error();
        }
      });

      try {
        const activePort = await Promise.any(checks);
        if (mounted && activePort !== selectedPort) {
          setSelectedPort(activePort);
        } else if (mounted) {
          timeoutId = setTimeout(detectActivePort, 1000);
        }
      } catch {
        if (mounted) {
          timeoutId = setTimeout(detectActivePort, 1000);
        }
      }
    };

    detectActivePort();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [availablePorts, ports, isServerUp, selectedPort]);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-bg-editor">
      {/* Address Bar Area */}
      <div className="flex h-12 w-full items-center gap-2 border-b border-white/4 bg-white/[0.02] px-3">
        <select
          value={selectedPort}
          onChange={(e) => setSelectedPort(e.target.value)}
          className="h-7 cursor-pointer rounded-md border border-white/10 bg-black/20 px-2 text-[12px] font-medium text-text-secondary outline-none transition-colors hover:bg-white/5 focus:border-accent/50"
        >
          {availablePorts.length > 0 ? (
            availablePorts.map((p) => (
              <option key={p} value={p}>
                Port {p}
              </option>
            ))
          ) : (
            <option value="3000">Port 3000</option>
          )}
        </select>
        
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 text-text-secondary">
          <Globe size={13} className="text-text-tertiary" />
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-text-tertiary"
            placeholder="/path"
          />
        </div>

        <button
          title="Refresh Preview"
          onClick={handleRefresh}
          className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-white/5 hover:text-text-primary"
        >
          <RefreshCw size={14} />
        </button>
        <button
          title="Open in new tab"
          onClick={handleOpenExternal}
          disabled={!url}
          className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-white/5 hover:text-text-primary disabled:opacity-50"
        >
          <ExternalLink size={14} />
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden bg-white">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-bg-editor">
            <span className="text-[13px] text-text-secondary">Loading mapped ports...</span>
          </div>
        ) : !mappedPort ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-bg-editor text-text-secondary">
            <ServerCrash size={24} className="text-text-tertiary" />
            <p className="text-[13px]">Server is not running on port {selectedPort}</p>
            <p className="text-[11px] text-text-tertiary">Run your app in the terminal to view it here.</p>
          </div>
        ) : !isServerUp ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-bg-editor text-text-secondary">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-r-transparent" />
            <p className="text-[13px]">Waiting for server on port {selectedPort}...</p>
            <p className="text-[11px] text-text-tertiary">Click Run in the top bar to start your app.</p>
          </div>
        ) : (
          <iframe
            key={key}
            src={url}
            title="Browser Preview"
            className="h-full w-full border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          />
        )}
      </div>
    </div>
  );
};
