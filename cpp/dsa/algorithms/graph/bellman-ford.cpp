
vector<int> bellmanFord(int V, vector<vector<int>>& edges, int source) { // @viz:def
    vector<int> dist(V, INT_MAX); // @viz:init
    dist[source] = 0; // @viz:init

    for (int i = 0; i < V - 1; i++) { // @viz:loop_v
        for (auto& edge : edges) { // @viz:loop_e
            int u = edge[0], v = edge[1], w = edge[2]; // @viz:loop_e
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) { // @viz:check
                dist[v] = dist[u] + w; // @viz:relax
            }
        }
    }

    for (auto& edge : edges) { // @viz:audit
        int u = edge[0], v = edge[1], w = edge[2]; // @viz:audit
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) { // @viz:audit_check
            return "Negative Cycle"; // @viz:error
        }
    }
    return dist; // @viz:return
}
