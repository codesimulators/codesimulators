// Recursive DFS Implementation
function dfs(nodeId, visited = new Set()) { // @viz:def
  const node = nodes.find(n => n.id === nodeId);
  visited.add(nodeId); // @viz:mark
  process(node); // @viz:visit
  
  for (let neighbor of node.neighbors) { // @viz:for
    if (!visited.has(neighbor)) { // @viz:check
      dfs(neighbor, visited); // @viz:dfs
    }
  }
}