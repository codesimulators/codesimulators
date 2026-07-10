def has_cycle(u, visited, rec_stack, adj): # @viz:def
    visited.add(u) # @viz:mark
    rec_stack.add(u) # @viz:mark
    
    for v in adj[u]: # @viz:for
        if v in rec_stack: # @viz:cycle_check
            return True # @viz:cycle_body
            
        if v not in visited: # @viz:dfs_check
            if has_cycle(v, visited, rec_stack, adj): # @viz:dfs_body
                return True # @viz:dfs_ret
                
    rec_stack.remove(u) # @viz:backtrack
    return False