function hasCycle(u, p, visited, adj) { // @viz:def
  visited.add(u); // @viz:mark
  
  for (let v of adj[u]) { // @viz:for
    if (v === p) { // @viz:skip_check
      continue; // @viz:skip_body
    }
    
    if (visited.has(v)) { // @viz:cycle_check
      return true; // @viz:cycle_body
    }
    
    if (hasCycle(v, u, visited, adj)) { // @viz:dfs_check @viz:dfs_body
      return true; // @viz:dfs_ret
    }
  }
  return false;
}