import { ConnectionRegistry } from "./connection-registry";
import { DockerService } from "./docker";
import { StorageService } from "./storage";
import path from "path";
import fs from "fs/promises";
import {
  CONTAINER_GRACE_PERIOD_MS,
  REAPER_INTERVAL_MS,
} from "../config/docker";

/**
 * Service responsible for scanning the ConnectionRegistry for projects with
 * zero active connections that have exceeded the grace period.
 *
 * This prevents sudden "cold starts" on page refreshes while ensuring
 * server resources are eventually reclaimed.
 */
export class IdleContainerReaper {
  private static intervalId: NodeJS.Timeout | null = null;

  /**
   * Starts the periodic background reaper task.
   */
  static start() {
    if (this.intervalId) {
      console.warn("[Reaper] Reaper is already running.");
      return;
    }

    this.intervalId = setInterval(async () => {
      const idleProjectIds = ConnectionRegistry.getIdleProjects(
        CONTAINER_GRACE_PERIOD_MS,
      );

      if (idleProjectIds.length === 0) return;

      console.log(
        `[Reaper] Found ${idleProjectIds.length} idle project(s) to evaluate.`,
      );

      for (const projectId of idleProjectIds) {
        try {
          /**
           * SECURITY/RACE-CONDITION CHECK:
           * We must verify the connection count is STILL zero before killing.
           * A user might have reconnected in the few milliseconds between
           * getIdleProjects() and this loop iteration.
           */
          if (ConnectionRegistry.getCount(projectId) === 0) {
            console.log(
              `[Reaper] Grace period expired for "${projectId}". Stopping container...`,
            );

            // 2. Sync to Blob Storage
            const projectPath = path.resolve(
              process.cwd(),
              "projects",
              projectId,
            );
            try {
              console.log(
                `Syncing project ${projectId} to blob storage before cleanup...`,
              );
              await StorageService.uploadProject(projectId, projectPath);
            } catch (syncError) {
              console.error(
                `Failed to sync project ${projectId} to storage during reaping:`,
                syncError,
              );
              // We might want to NOT delete local files if sync fails,
              // but for now, we'll log and continue to avoid leaking disk space.
            }

            await DockerService.stopAndRemoveContainer(projectId);

            await fs
              .rm(projectPath, { recursive: true, force: true })
              .catch(() => {});

            ConnectionRegistry.cleanup(projectId);
          } else {
            console.log(
              `[Reaper] Aborting reaper for "${projectId}" - user reconnected.`,
            );
          }
        } catch (error) {
          console.error(
            `[Reaper] Critical failure during cleanup of project "${projectId}":`,
            error,
          );
        }
      }
    }, REAPER_INTERVAL_MS);

    console.log(
      `[Reaper] Service started. [Interval: ${REAPER_INTERVAL_MS}ms] [Grace Period: ${CONTAINER_GRACE_PERIOD_MS}ms]`,
    );
  }

  /**
   * Stops the background reaper task (useful for testing or graceful shutdown).
   */
  static stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("[Reaper] Service stopped.");
    }
  }
}
