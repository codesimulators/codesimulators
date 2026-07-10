func canFinish(numCourses int, prerequisites [][]int) bool { // @viz: def
    adj := make([][]int, numCourses)
    for _, p := range prerequisites {
        adj[p[1]] = append(adj[p[1]], p[0])
    }
    
    visited := make([]int, numCourses) // 0: unvisited, 1: visiting, 2: visited
    
    var hasCycle func(int) bool
    hasCycle = func(u int) bool {
        if visited[u] == 1 { return true } // @viz: dfs_cycle
        if visited[u] == 2 { return false }
        
        visited[u] = 1 // @viz: dfs_mark
        for _, v := range adj[u] { // @viz: dfs_for
            if hasCycle(v) { return true } // @viz: dfs_recurse
        }
        visited[u] = 2 // @viz: dfs_push
        return false
    }
    
    for i := 0; i < numCourses; i++ { // @viz: loop
        if hasCycle(i) { return false }
    }
    return true // @viz: ret
}