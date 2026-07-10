def hasCycle(u, p, visited, adj): # @viz:def
    visited.add(u) # @viz:mark
    
    for v in adj[u]: # @viz:for
        if v == p: # @viz:skip_check
            continue # @viz:skip_body
        
        if v in visited: # @viz:cycle_check
            return True # @viz:cycle_body
            
        if hasCycle(v, u, visited, adj): # @viz:dfs_check @viz:dfs_body
            return True # @viz:dfs_ret
            
    return False