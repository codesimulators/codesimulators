public boolean canFinish(int numCourses, int[][] prerequisites) { // @viz: def
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) adj.get(p[1]).add(p[0]);

    int[] visited = new int[numCourses]; // 0: unvisited, 1: visiting, 2: visited

    for (int i = 0; i < numCourses; i++) { // @viz: loop
        if (hasCycle(i, adj, visited)) return false;
    }
    return true; // @viz: ret
}

private boolean hasCycle(int u, List<List<Integer>> adj, int[] visited) {
    if (visited[u] == 1) return true; // @viz: dfs_cycle
    if (visited[u] == 2) return false;

    visited[u] = 1; // @viz: dfs_mark
    for (int v : adj.get(u)) { // @viz: dfs_for
        if (hasCycle(v, adj, visited)) return true; // @viz: dfs_recurse
    }
    visited[u] = 2; // @viz: dfs_push
    return false;
}