void dfs(string nodeId, unordered_set<string>& visited) { // @viz:def
    visited.insert(nodeId); // @viz:mark
    process(nodeId); // @viz:visit

    for (string neighbor : adj[nodeId]) { // @viz:for
        if (visited.find(neighbor) == visited.end()) { // @viz:check
            dfs(neighbor, visited); // @viz:dfs
        }
    }
}