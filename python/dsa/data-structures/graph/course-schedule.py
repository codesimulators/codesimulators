def canFinish(numCourses, prerequisites): # @viz: def
    adj = [[] for _ in range(numCourses)]
    for v, u in prerequisites:
        adj[u].append(v)
        
    visited = [0] * numCourses # 0: unvisited, 1: visiting, 2: visited
    
    def has_cycle(u):
        if visited[u] == 1: return True # @viz: dfs_cycle
        if visited[u] == 2: return False
        
        visited[u] = 1 # @viz: dfs_mark
        for v in adj[u]: # @viz: dfs_for
            if has_cycle(v): return True # @viz: dfs_recurse
        visited[u] = 2 # @viz: dfs_push
        return False
        
    for i in range(numCourses): # @viz: loop
        if has_cycle(i): return False
    return True # @viz: ret