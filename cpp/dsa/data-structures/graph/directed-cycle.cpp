bool hasCycle(int u, vector<bool>& visited, vector<bool>& recStack, vector<int> adj[]) { // @viz:def
    visited[u] = true; // @viz:mark
    recStack[u] = true; // @viz:mark
    
    for (auto v : adj[u]) { // @viz:for
        if (recStack[v]) { // @viz:cycle_check
            return true; // @viz:cycle_body
        }
        
        if (!visited[v]) { // @viz:dfs_check
            if (hasCycle(v, visited, recStack, adj)) { // @viz:dfs_body
                return true; // @viz:dfs_ret
            }
        }
    }
    
    recStack[u] = false; // @viz:backtrack
    return false;
}