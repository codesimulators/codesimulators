void dfs(String nodeId, Set<String> visited) { // @viz:def
    visited.add(nodeId); // @viz:mark
    process(nodeId); // @viz:visit

    for (String neighbor : getNeighbors(nodeId)) { // @viz:for
        if (!visited.contains(neighbor)) { // @viz:check
            dfs(neighbor, visited); // @viz:dfs
        }
    }
}