const shellConnections = new Map<string, number>();
const lastActiveAt = new Map<string, number>();

export const ConnectionRegistry = {
  /**
   * Registers a new shell connection for the given project.
   * Clears any idle timestamp as the project is now active.
   */
  connect(projectId: string): number {
    const count = (shellConnections.get(projectId) ?? 0) + 1;
    shellConnections.set(projectId, count);
    lastActiveAt.delete(projectId);
    console.log(`[ConnectionRegistry] +1 shell connection for project "${projectId}". Total: ${count}`);
    return count;
  },

  /**
   * Removes a shell connection for the given project.
   * If this was the last connection, marks the project as idle with the current timestamp.
   */
  disconnect(projectId: string): void {
    const current = shellConnections.get(projectId) ?? 0;
    const count = Math.max(current - 1, 0);

    shellConnections.set(projectId, count);

    if (count === 0) {
      lastActiveAt.set(projectId, Date.now());
      console.log(`[ConnectionRegistry] Last shell connection closed for project "${projectId}". Marked as idle.`);
    } else {
      console.log(`[ConnectionRegistry] -1 shell connection for project "${projectId}". Remaining: ${count}`);
    }
  },

  /**
   * Returns a list of project IDs that have been idle (0 connections)
   * for longer than the specified grace period.
   */
  getIdleProjects(gracePeriodMs: number): string[] {
    const now = Date.now();
    const idle: string[] = [];

    for (const [projectId, timestamp] of lastActiveAt.entries()) {
      if (now - timestamp > gracePeriodMs) {
        idle.push(projectId);
      }
    }

    return idle;
  },

  /**
   * Fully removes a project from the registry.
   * Used after a container has been successfully reaped.
   */
  cleanup(projectId: string): void {
    shellConnections.delete(projectId);
    lastActiveAt.delete(projectId);
    console.log(`[ConnectionRegistry] Project "${projectId}" fully removed from registry.`);
  },

  /** Returns the current number of active shell connections for a project. */
  getCount(projectId: string): number {
    return shellConnections.get(projectId) ?? 0;
  },
};
