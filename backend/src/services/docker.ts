import Docker from "dockerode";
import path from "path";
import fs from "fs/promises";
import { IMAGE_NAME, SANDBOX_NETWORK } from "../config/docker";

const docker = new Docker();


export class DockerService {
  static async ensureImage() {
    try {
      await docker.getImage(IMAGE_NAME).inspect();
      console.log(`Image ${IMAGE_NAME} already exists.`);
    } catch (error) {
      console.log(`Image ${IMAGE_NAME} not found locally. Pulling from registry...`);

      const stream = await docker.pull(IMAGE_NAME);

      await new Promise((resolve, reject) => {
        docker.modem.followProgress(
          stream,
          (err, res) => (err ? reject(err) : resolve(res)),
          (event) => {
            if (event.status) {
              process.stdout.write(`[Docker Pull] ${event.status} ${event.progress || ""}\r`);
            }
          },
        );
      });
      console.log(`\nImage ${IMAGE_NAME} pulled successfully.`);
    }
  }

  // Creates the isolated bridge network if it doesn't exist.
  // ICC is disabled so containers cannot reach each other.
  static async ensureNetwork() {
    try {
      await docker.getNetwork(SANDBOX_NETWORK).inspect();
      console.log(`Network ${SANDBOX_NETWORK} already exists.`);
    } catch {
      console.log(`Network ${SANDBOX_NETWORK} not found. Creating...`);
      await docker.createNetwork({
        Name: SANDBOX_NETWORK,
        Driver: "bridge",
        Options: {
          "com.docker.network.bridge.enable_icc": "false",
        },
      });
      console.log(`Network ${SANDBOX_NETWORK} created.`);
    }
  }

  static async getOrCreateContainer(projectId: string) {
    const containerName = `sandbox-${projectId}`;
    let container: Docker.Container = docker.getContainer(containerName);

    try {
      const data = await container.inspect();
      if (!data.State.Running) {
        await container.start();
      }
    } catch (error) {
      console.log(`Container ${containerName} not found. Creating...`);

      const hostProjectPath = path.resolve(process.cwd(), "projects", projectId);

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
        Env: ["CHOKIDAR_USEPOLLING=true", "WATCHPACK_POLLING=true"],
        ExposedPorts: {
          "3000/tcp": {},
          "5173/tcp": {},
          "8000/tcp": {},
          "8080/tcp": {},
        },
        HostConfig: {
          Binds: [`${hostProjectPath}:/home/sandbox/projects`],
          PortBindings: {
            "3000/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
            "5173/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
            "8000/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
            "8080/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }],
          },
          // Resource limits
          PidsLimit: 100,
          Memory: 512 * 1024 * 1024,
          NanoCpus: 1 * 1e9,
          // Network isolation
          NetworkMode: SANDBOX_NETWORK,
          // Capability hardening
          CapDrop: ["ALL"],
          CapAdd: [],
          SecurityOpt: ["no-new-privileges:true"],
          // Read-only OS filesystem; project volume stays writable
          ReadonlyRootfs: true,
          Tmpfs: { "/tmp": "rw,noexec,nosuid,size=100m" },
          Privileged: false,
        },
        WorkingDir: "/home/sandbox/projects",
      });

      await container.start();
    }

    return container;
  }

  // Runs the scaffold command inside the container and waits for it to finish.
  // Uses /bin/sh so the full command string (flags, args) is handled correctly.
  static async scaffoldProject(projectId: string, command: string): Promise<void> {
    const container = await DockerService.getOrCreateContainer(projectId);

    const exec = await docker.getContainer(container.id).exec({
      Cmd: ["/bin/sh", "-c", command],
      AttachStdout: true,
      AttachStderr: true,
      Tty: false,
      WorkingDir: "/home/sandbox/projects",
    });

    const stream = await exec.start({ hijack: true, stdin: false });

    await new Promise<void>((resolve, reject) => {
      stream.on("end", async () => {
        try {
          const info = await exec.inspect();
          if (info.ExitCode !== 0) {
            reject(new Error(`Scaffold command exited with code ${info.ExitCode}`));
          } else {
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
      stream.on("error", reject);
    });
  }

  static async createShellStream(containerId: string) {
    const container = docker.getContainer(containerId);

    const exec = await container.exec({
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
    });

    const stream = await exec.start({ hijack: true, stdin: true });
    return stream;
  }

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
            const portStr = containerPort.split("/")[0];
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

  static async removeContainer(projectId: string) {
    const containerName = `sandbox-${projectId}`;
    const container = docker.getContainer(containerName);
    try {
      await container.remove({ force: false });
      console.log(`Container ${containerName} removed.`);
    } catch (e) {
      console.warn(`Could not remove container ${containerName}`, e);
    }
  }

  static async stopAndRemoveContainer(projectId: string) {
    await DockerService.stopContainer(projectId);
    await DockerService.removeContainer(projectId);
  }
}
