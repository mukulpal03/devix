import { Request, Response, NextFunction } from "express";
import httpProxy from "http-proxy";
import { DockerService } from "../services/docker";

const proxy = httpProxy.createProxyServer({
  ws: true,
  changeOrigin: true,
  ignorePath: true,
});

proxy.on("error", (err, req, res) => {
  console.error("[Proxy Error]:", err);
  if (res && "writeHead" in res) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway: Unable to proxy request to the sandbox.");
  }
});

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const previewProxyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try to extract a UUID from the first part of the hostname
  // e.g., <uuid>.localhost or <uuid>.3.230.179.152.sslip.io
  const parts = req.hostname.split(".");
  const potentialId = parts[0];

  if (!uuidRegex.test(potentialId)) {
    return next();
  }

  const projectId = potentialId;

  try {
    const ports = await DockerService.getContainerPorts(projectId);
    // React/Vite runs on 5173 by default in our container
    const targetPort = ports["5173"];

    if (!targetPort) {
      res.status(503).send("Sandbox is not running or port 5173 is not exposed.");
      return;
    }

    const targetUrl = `http://127.0.0.1:${targetPort}${req.originalUrl}`;
    
    proxy.web(req, res, { target: targetUrl });
  } catch (error) {
    console.error(`[Proxy Middleware] Error resolving ports for ${projectId}:`, error);
    res.status(500).send("Internal Server Error resolving sandbox routing.");
  }
};

export const handleUpgrade = async (req: any, socket: any, head: any) => {
  const parts = req.headers.host?.split(".") || [];
  const potentialId = parts[0];

  if (potentialId && uuidRegex.test(potentialId)) {
    const projectId = potentialId;
    try {
      const ports = await DockerService.getContainerPorts(projectId);
      const targetPort = ports["5173"];

      if (targetPort) {
        const targetUrl = `http://127.0.0.1:${targetPort}${req.url}`;
        proxy.ws(req, socket, head, { target: targetUrl });
        return true; // Indicates we handled the upgrade
      }
    } catch (err) {
      console.error("[Proxy Upgrade Error]:", err);
    }
  }
  return false; // Did not handle
};
