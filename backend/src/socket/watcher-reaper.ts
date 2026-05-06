import { Namespace } from "socket.io";
import { ProjectWatcherService } from "./watcher";
import { WATCHER_REAPER_INTERVAL_MS } from "../config/watcher";

/**
 * Service that periodically cleans up zombie Chokidar watchers.
 * 
 * Watchers can leak if:
 * 1. A socket disconnect event is missed (server load, unexpected crashes).
 * 2. Logic errors in reference counting.
 * 
 * Each watcher consumes an inotify file descriptor. Linux has a hard limit
 * (default 8192). This reaper ensures we never hit that limit.
 */
export class WatcherReaper {
  private static intervalId: NodeJS.Timeout | null = null;

  static start(editorNamespace: Namespace) {
    if (this.intervalId) return;

    this.intervalId = setInterval(async () => {
      try {
        await ProjectWatcherService.reapIdleWatchers(editorNamespace);
      } catch (error) {
        console.error("[WatcherReaper] Failure during periodic cleanup:", error);
      }
    }, WATCHER_REAPER_INTERVAL_MS);

    console.log(`[WatcherReaper] Started with interval: ${WATCHER_REAPER_INTERVAL_MS}ms`);
  }

  static stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
