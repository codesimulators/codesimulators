def dfs(node_id, visited=None): # @viz:def
    if visited is None: visited = set()
    visited.add(node_id) # @viz:mark
    process(node_id) # @viz:visit
    for neighbor in get_neighbors(node_id): # @viz:for
        if neighbor not in visited: # @viz:check
            dfs(neighbor, visited) # @viz:dfs