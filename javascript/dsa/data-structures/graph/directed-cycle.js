function hasCycle(u, visited, recStack, adj) { // @viz:def
  visited.add(u); // @viz:mark
  recStack.add(u); // @viz:mark
  
  for (let v of adj[u]) { // @viz:for
    if (recStack.has(v)) { // @viz:cycle_check
      return true; // @viz:cycle_body
    }
    
    if (!visited.has(v)) { // @viz:dfs_check
      if (hasCycle(v, visited, recStack, adj)) { // @viz:dfs_body
        return true; // @viz:dfs_ret
      }
    }
  }
  
  recStack.delete(u); // @viz:backtrack
  return false;
}