boolean hasCycle(int u, boolean[] visited, boolean[] recStack, List<List<Integer>> adj) { // @viz:def
    visited[u] = true; // @viz:mark
    recStack[u] = true; // @viz:mark
    
    for (int v : adj.get(u)) { // @viz:for
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