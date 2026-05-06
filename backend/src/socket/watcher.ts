import chokidar, { FSWatcher } from "chokidar";
import { Namespace } from "socket.io";
import path from "path";

interface ProjectWatcher {
  watcher: FSWatcher;
  userCount: number;
  debounceTimer: NodeJS.Timeout | null;
}

const projectWatchers: Map<string, ProjectWatcher> = new Map();

/**
 * Manages centralized file watchers for projects.
 * Prevents multiple observers for the same project directory and debounces sync events.
 */
export const ProjectWatcherService = {
  /**
   * Starts watching a project and attaches it to the editor namespace room.
   */
  watchProject: (projectId: string, namespace: Namespace) => {
    let projectWatcher = projectWatchers.get(projectId);

    if (projectWatcher) {
      projectWatcher.userCount++;
      console.log(`Watcher attached for project: ${projectId}. User count: ${projectWatcher.userCount}`);
      return;
    }

    console.log(`Initializing new centralized watcher for project: ${projectId}`);
    
    const projectPath = path.join(process.cwd(), "projects", projectId);
    
    const watcher = chokidar.watch(projectPath, {
      ignored: (p) => p.includes("node_modules") || p.includes(".git"),
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 100,
      },
    });

    const newProjectWatcher: ProjectWatcher = {
      watcher,
      userCount: 1,
      debounceTimer: null,
    };

    projectWatchers.set(projectId, newProjectWatcher);

    // Emit treeUpdate to the project room when any file change occurs
    watcher.on("all", (event, p) => {
      console.log(`[Watcher] ${event} detected at ${p} in project ${projectId}`);
      
      // Debounce the emission to prevent flooding
      if (newProjectWatcher.debounceTimer) {
        clearTimeout(newProjectWatcher.debounceTimer);
      }

      newProjectWatcher.debounceTimer = setTimeout(() => {
        console.log(`[Watcher] Emitting treeUpdated to room: ${projectId}`);
        namespace.to(projectId).emit("treeUpdated", { event, path: p });
        newProjectWatcher.debounceTimer = null;
      }, 500); // 500ms debounce
    });
  },

  /**
   * Stops watching a project if no users are connected.
   */
  unwatchProject: async (projectId: string) => {
    const projectWatcher = projectWatchers.get(projectId);

    if (!projectWatcher) return;

    projectWatcher.userCount--;
    console.log(`User detached from project: ${projectId}. User count: ${projectWatcher.userCount}`);

    if (projectWatcher.userCount <= 0) {
      await ProjectWatcherService.forceStopWatcher(projectId);
    }
  },

  /**
   * Immediately closes a watcher and removes it from the registry.
   */
  forceStopWatcher: async (projectId: string) => {
    const projectWatcher = projectWatchers.get(projectId);
    if (!projectWatcher) return;

    console.log(`Closing watcher for project: ${projectId}`);
    
    if (projectWatcher.debounceTimer) {
      clearTimeout(projectWatcher.debounceTimer);
    }
    
    try {
      await projectWatcher.watcher.close();
    } catch (error) {
      console.error(`Error closing watcher for ${projectId}:`, error);
    } finally {
      projectWatchers.delete(projectId);
    }
  },

  /**
   * Fail-safe: Scans all active watchers and closes those where the 
   * Socket.IO room is empty. This prevents "zombie" watchers from 
   * leaking inotify descriptors if disconnect events are missed.
   */
  reapIdleWatchers: async (namespace: Namespace) => {
    console.log("[WatcherReaper] Scanning for zombie watchers...");
    
    for (const projectId of projectWatchers.keys()) {
      const room = namespace.adapter.rooms.get(projectId);
      const activeConnections = room ? room.size : 0;

      if (activeConnections === 0) {
        console.warn(`[WatcherReaper] Found zombie watcher for project "${projectId}". Reaping...`);
        await ProjectWatcherService.forceStopWatcher(projectId);
      }
    }
  }
};
