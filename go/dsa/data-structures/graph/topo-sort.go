func topoSortDFS(V int, adj [][]int) []int { // @viz:def
    visited := make([]bool, V) // @viz:init
    stack := []int{} // @viz:stack_init
    
    var dfs func(int)
    dfs = func(u int) { // @viz:dfs_def
        visited[u] = true // @viz:dfs_mark
        for _, v := range adj[u] { // @viz:dfs_for
            if !visited[v] { dfs(v) } // @viz:dfs_recurse
        }
        stack = append(stack, u) // @viz:dfs_push
    }
    
    for i := 0; i < V; i++ { // @viz:loop
        if !visited[i] { dfs(i) } // @viz:dfs_call
    }
    
    res := make([]int, V) // @viz:ret
    for i := 0; i < V; i++ {
        res[i] = stack[V-1-i]
    }
    return res
}