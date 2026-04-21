import Docker from "dockerode";
import path from "path";
import fs from "fs/promises";

const docker = new Docker();
const IMAGE_NAME = "devix-sandbox";

export class DockerService {
  /**
   * Ensures the Docker image is available.
   * If it doesn't exist, it attempts to build it from the backend Dockerfile.
   */
  static async ensureImage() {
    try {
      await docker.getImage(IMAGE_NAME).inspect();
      console.log(`Image ${IMAGE_NAME} already exists.`);
    } catch (error) {
      console.log(`Image ${IMAGE_NAME} not found. Building...`);
      const dockerfilePath = path.join(process.cwd(), "Dockerfile");
      const contextPath = process.cwd();

      // Simple implementation of build
      // In a production environment, this should be more robust
      const stream = await docker.buildImage(
        {
          context: contextPath,
          src: ["Dockerfile"],
        },
        { t: IMAGE_NAME }
      );

      await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }, (event) => {
          if (event.stream) {
              process.stdout.write(event.stream);
          }
        });
      });
      console.log(`Image ${IMAGE_NAME} built successfully.`);
    }
  }

  /**
   * Starts a container for a project and provides an interactive bash stream.
   */
  static async getOrCreateContainer(projectId: string) {
    const containerName = `sandbox-${projectId}`;
    let container = docker.getContainer(containerName);

    try {
      const data = await container.inspect();
      if (!data.State.Running) {
        await container.start();
      }
    } catch (error) {
      console.log(`Container ${containerName} not found. Creating...`);
      
      // Absolute path to the project directory on host
      // Assuming projects are in e:/replit/backend/projects/
      const hostProjectPath = path.resolve(process.cwd(), "projects", projectId);
      
      // Ensure host project path exists
      try {
        await fs.access(hostProjectPath);
      } catch {
        await fs.mkdir(hostProjectPath, { recursive: true });
      }

      container = await docker.createContainer({
        Image: IMAGE_NAME,
        name: containerName,
        Tty: true,
        OpenStdin: true,
        StdinOnce: false,
        Env: [
          "CHOKIDAR_USEPOLLING=true",
          "WATCHPACK_POLLING=true"
        ],
        ExposedPorts: {
          "3000/tcp": {},
          "5173/tcp": {},
          "8000/tcp": {},
          "8080/tcp": {}
        },
        HostConfig: {
          Binds: [`${hostProjectPath}:/home/sandbox/projects`],
          PortBindings: {
            "3000/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
            "5173/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
            "8000/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
            "8080/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }]
          }
        },
        WorkingDir: "/home/sandbox/projects",
      });

      await container.start();
    }

    return container;
  }

  /**
   * Attaches to a container's bash and returns a stream.
   */
  static async createShellStream(containerId: string) {
    const container = docker.getContainer(containerId);
    
    // Use exec to start a fresh bash session
    const exec = await container.exec({
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
    });

    const stream = await exec.start({
      hijack: true,
      stdin: true,
    });

    return stream;
  }
  
  /**
   * Retrieves mapped ports for the container
   */
  static async getContainerPorts(projectId: string) {
    const containerName = `sandbox-${projectId}`;
    const container = docker.getContainer(containerName);
    
    try {
      const data = await container.inspect();
      const ports = data.NetworkSettings.Ports;
      const mappedPorts: Record<string, string> = {};
      
      if (ports) {
        for (const [containerPort, hostBindings] of Object.entries(ports)) {
          if (hostBindings && hostBindings.length > 0) {
            const portStr = containerPort.split('/')[0];
            mappedPorts[portStr] = hostBindings[0].HostPort;
          }
        }
      }
      return mappedPorts;
    } catch (error) {
      console.error(`Error inspecting container ports for ${containerName}:`, error);
      return {};
    }
  }
  
  static async stopContainer(projectId: string) {
      const containerName = `sandbox-${projectId}`;
      const container = docker.getContainer(containerName);
      try {
          await container.stop();
          console.log(`Container ${containerName} stopped.`);
      } catch (e) {
          console.warn(`Could not stop container ${containerName}`, e);
      }
  }
}
