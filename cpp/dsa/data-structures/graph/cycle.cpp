bool hasCycle(int u, int p, vector<bool>& visited, vector<int> adj[]) { // @viz:def
    visited[u] = true; // @viz:mark
    
    for (auto v : adj[u]) { // @viz:for
        if (v == p) { // @viz:skip_check
            continue; // @viz:skip_body
        }
        
        if (visited[v]) { // @viz:cycle_check
            return true; // @viz:cycle_body
        }
        
        if (hasCycle(v, u, visited, adj)) { // @viz:dfs_check @viz:dfs_body
            return true; // @viz:dfs_ret
        }
    }
    return false;
}