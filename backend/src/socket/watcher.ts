import chokidar, { FSWatcher } from "chokidar";
import { Namespace } from "socket.io";

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
    
    const watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules") || path.includes(".git"),
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
    watcher.on("all", (event, path) => {
      console.log(`[Watcher] ${event} detected at ${path} in project ${projectId}`);
      
      // Debounce the emission to prevent flooding
      if (newProjectWatcher.debounceTimer) {
        clearTimeout(newProjectWatcher.debounceTimer);
      }

      newProjectWatcher.debounceTimer = setTimeout(() => {
        console.log(`[Watcher] Emitting treeUpdated to room: ${projectId}`);
        namespace.to(projectId).emit("treeUpdated", { event, path });
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
      console.log(`Closing watcher for project: ${projectId} as no users are connected.`);
      if (projectWatcher.debounceTimer) {
        clearTimeout(projectWatcher.debounceTimer);
      }
      await projectWatcher.watcher.close();
      projectWatchers.delete(projectId);
    }
  },
};
