
func bellmanFord(V int, edges [][]int, source int) interface{} { // @viz:def
    dist := make([]int, V) // @viz:init
    for i := range dist { dist[i] = math.MaxInt32 } // @viz:init
    dist[source] = 0 // @viz:init

    for i := 0; i < V-1; i++ { // @viz:loop_v
        for _, edge := range edges { // @viz:loop_e
            u, v, w := edge[0], edge[1], edge[2] // @viz:loop_e
            if dist[u] != math.MaxInt32 && dist[u]+w < dist[v] { // @viz:check
                dist[v] = dist[u] + w // @viz:relax
            }
        }
    }

    for _, edge := range edges { // @viz:audit
        u, v, w := edge[0], edge[1], edge[2] // @viz:audit
        if dist[u] != math.MaxInt32 && dist[u]+w < dist[v] { // @viz:audit_check
            return "Negative Cycle" // @viz:error
        }
    }
    return dist // @viz:return
}
