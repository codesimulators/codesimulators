function topoSortDFS(V, adj) { // @viz:def
  const visited = new Set(); // @viz:init
  const stack = []; // @viz:stack_init
  
  function dfs(u) { // @viz:dfs_def
    visited.add(u); // @viz:dfs_mark
    for (let v of adj[u]) { // @viz:dfs_for
      if (!visited.has(v)) { // @viz:dfs_recurse_check
        dfs(v); // @viz:dfs_recurse
      }
    }
    stack.push(u); // @viz:dfs_push
  }

  for (let i = 0; i < V; i++) { // @viz:loop
    if (!visited.has(i)) { // @viz:dfs_call_check
      dfs(i); // @viz:dfs_call
    }
  }

  return stack.reverse(); // @viz:ret
}