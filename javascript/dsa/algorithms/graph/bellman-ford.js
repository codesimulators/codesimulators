
function bellmanFord(V, edges, source) { // @viz:def
    const dist = Array(V).fill(Infinity); // @viz:init
    dist[source] = 0; // @viz:init

    for (let i = 0; i < V - 1; i++) { // @viz:loop_v
        for (const [u, v, w] of edges) { // @viz:loop_e
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) { // @viz:check
                dist[v] = dist[u] + w; // @viz:relax
            }
        }
    }

    for (const [u, v, w] of edges) { // @viz:audit
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) { // @viz:audit_check
            return "Negative Cycle"; // @viz:error
        }
    }
    return dist; // @viz:return
}
