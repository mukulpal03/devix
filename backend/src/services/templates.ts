import fs from "fs/promises";
import path from "path";
import Docker from "dockerode";
import { IMAGE_NAME } from "../config/docker";
import { StorageService } from "./storage";

const docker = new Docker();

export class TemplateService {
  static getTemplatePath(): string {
    return path.resolve(process.cwd(), "templates", "react");
  }

  static async ensureTemplates(): Promise<void> {
    const templatePath = this.getTemplatePath();
    const nodeModulesPath = path.join(templatePath, "node_modules");

    try {
      await fs.access(nodeModulesPath);
      console.log("[TemplateService] Template cache is warm and ready.");
      return;
    } catch {
      console.log(
        "[TemplateService] Template cache is cold. Ensuring template files exist...",
      );
    }

    await fs.mkdir(templatePath, { recursive: true });

    // Step 1: Attempt to download boilerplate template from S3
    let hasTemplateOnS3 = false;
    try {
      await StorageService.downloadProject("templates/react", templatePath);
      await fs.access(path.join(templatePath, "package.json"));
      hasTemplateOnS3 = true;
      console.log(
        "[TemplateService] Successfully downloaded template boilerplate from S3.",
      );
    } catch (s3Error) {
      console.log(
        "[TemplateService] Boilerplate not found on S3, invalid, or download failed. Scaffolding a new React project...",
      );
    }

    // Step 2: If S3 did not contain template files, scaffold a new Vite React project
    if (!hasTemplateOnS3) {
      console.log(
        "[TemplateService] Scaffolding React project via Vite in container...",
      );
      await fs
        .rm(templatePath, { recursive: true, force: true })
        .catch(() => {});
      await fs.mkdir(templatePath, { recursive: true });

      await this.runInContainer(
        "npx -y create-vite@latest . --template react --no-interactive",
      );

      // Upload the clean template source (no node_modules) to S3 for future server boots
      try {
        console.log(
          "[TemplateService] Uploading new template boilerplate to S3...",
        );
        await StorageService.uploadProject("templates/react", templatePath);
      } catch (uploadError) {
        console.warn(
          "[TemplateService] Failed to upload template to S3 (non-blocking):",
          uploadError,
        );
      }
    }

    // Step 2.5: Patch package.json to ensure Vite exposes the server to the Docker network
    try {
      const pkgPath = path.join(templatePath, "package.json");
      const pkgRaw = await fs.readFile(pkgPath, "utf-8");
      const pkg = JSON.parse(pkgRaw);
      if (pkg.scripts?.dev && !pkg.scripts.dev.includes("--host")) {
        pkg.scripts.dev = `${pkg.scripts.dev} --host`;
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
        console.log("[TemplateService] Patched template package.json with --host");
      }
    } catch (err) {
      console.warn("[TemplateService] Could not patch package.json:", err);
    }

    // Step 3: Run npm install inside container to create Linux-compatible node_modules
    console.log("[TemplateService] Running npm install in container...");
    await this.runInContainer("npm install");
    console.log("[TemplateService] React template is now fully ready.");
  }

  private static async runInContainer(command: string): Promise<void> {
    const templatePath = this.getTemplatePath();
    const container = await docker.createContainer({
      Image: IMAGE_NAME,
      Tty: false,
      HostConfig: {
        Binds: [`${templatePath}:/home/sandbox/projects`],
        ReadonlyRootfs: false, // Writable to install files/packages
      },
      WorkingDir: "/home/sandbox/projects",
      Cmd: ["/bin/sh", "-c", command],
    });

    await container.start();
    const waitResult = await container.wait();

    if (waitResult.StatusCode !== 0) {
      let logs: Buffer = Buffer.from("");
      try {
        logs = (await container.logs({ stdout: true, stderr: true })) as Buffer;
      } catch (logError) {
        console.error(
          "[TemplateService] Failed to fetch container logs:",
          logError,
        );
      }
      await container.remove().catch(() => {});
      throw new Error(
        `Command "${command}" failed inside template container with exit code ${waitResult.StatusCode}. Logs:\n${logs.toString("utf-8")}`,
      );
    }

    await container.remove().catch(() => {});
  }
}
