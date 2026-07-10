def topoSortDFS(V, adj): # @viz:def
    visited = set() # @viz:init
    stack = [] # @viz:stack_init
    
    def dfs(u): # @viz:dfs_def
        visited.add(u) # @viz:dfs_mark
        for v in adj[u]: # @viz:dfs_for
            if v not in visited: # @viz:dfs_recurse
                dfs(v)
        stack.append(u) # @viz:dfs_push
        
    for i in range(V): # @viz:loop
        if i not in visited: # @viz:dfs_call
            dfs(i)
            
    return stack[::-1] # @viz:ret