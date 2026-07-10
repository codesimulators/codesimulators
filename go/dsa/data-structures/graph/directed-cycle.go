func hasCycle(u int, visited, recStack []bool, adj [][]int) bool { // @viz:def
    visited[u] = true // @viz:mark
    recStack[u] = true // @viz:mark
    
    for _, v := range adj[u] { // @viz:for
        if recStack[v] { // @viz:cycle_check
            return true // @viz:cycle_body
        }
        
        if !visited[v] { // @viz:dfs_check
            if hasCycle(v, visited, recStack, adj) { // @viz:dfs_body
                return true // @viz:dfs_ret
            }
        }
    }
    
    recStack[u] = false // @viz:backtrack
    return false
}