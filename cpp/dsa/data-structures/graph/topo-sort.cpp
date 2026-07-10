vector<int> topoSortDFS(int V, vector<int> adj[]) { // @viz:def
    vector<int> visited(V, 0); // @viz:init
    stack<int> st; // @viz:stack_init
    
    for (int i = 0; i < V; i++) { // @viz:loop
        if (!visited[i]) dfs(i, adj, visited, st); // @viz:dfs_call
    }
    
    vector<int> res; // @viz:ret
    while (!st.empty()) {
        res.push_back(st.top());
        st.pop();
    }
    return res;
}

void dfs(int u, vector<int> adj[], vector<int>& visited, stack<int>& st) { // @viz:dfs_def
    visited[u] = 1; // @viz:dfs_mark
    for (int v : adj[u]) { // @viz:dfs_for
        if (!visited[v]) dfs(v, adj, visited, st); // @viz:dfs_recurse
    }
    st.push(u); // @viz:dfs_push
}