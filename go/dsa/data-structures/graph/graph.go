func dfs(nodeId string, visited map[string]bool) { // @viz:def
    visited[nodeId] = true // @viz:mark
    process(nodeId) // @viz:visit

    for _, neighbor := range adj[nodeId] { // @viz:for
        if !visited[neighbor] { // @viz:check
            dfs(neighbor, visited) // @viz:dfs
        }
    }
}