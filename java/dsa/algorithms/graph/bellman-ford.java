
public Object bellmanFord(int V, int[][] edges, int source) { // @viz:def
    double[] dist = new double[V]; // @viz:init
    Arrays.fill(dist, Double.POSITIVE_INFINITY); // @viz:init
    dist[source] = 0; // @viz:init

    for (int i = 0; i < V - 1; i++) { // @viz:loop_v
        for (int[] edge : edges) { // @viz:loop_e
            int u = edge[0], v = edge[1], w = edge[2]; // @viz:loop_e
            if (dist[u] != Double.POSITIVE_INFINITY && dist[u] + w < dist[v]) { // @viz:check
                dist[v] = dist[u] + w; // @viz:relax
            }
        }
    }

    for (int[] edge : edges) { // @viz:audit
        int u = edge[0], v = edge[1], w = edge[2]; // @viz:audit
        if (dist[u] != Double.POSITIVE_INFINITY && dist[u] + w < dist[v]) { // @viz:audit_check
            return "Negative Cycle"; // @viz:error
        }
    }
    return dist; // @viz:return
}
