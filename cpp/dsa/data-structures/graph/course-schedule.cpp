bool canFinish(int numCourses, vector<vector<int>>& prerequisites) { // @viz: def
    vector<vector<int>> adj(numCourses);
    for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
    
    vector<int> visited(numCourses, 0); // 0: unvisited, 1: visiting, 2: visited
    
    for (int i = 0; i < numCourses; i++) { // @viz: loop
        if (hasCycle(i, adj, visited)) return false;
    }
    return true; // @viz: ret
}

bool hasCycle(int u, vector<vector<int>>& adj, vector<int>& visited) {
    if (visited[u] == 1) return true; // @viz: dfs_cycle
    if (visited[u] == 2) return false;
    
    visited[u] = 1; // @viz: dfs_mark
    for (int v : adj[u]) { // @viz: dfs_for
        if (hasCycle(v, adj, visited)) return true; // @viz: dfs_recurse
    }
    visited[u] = 2; // @viz: dfs_push
    return false;
}