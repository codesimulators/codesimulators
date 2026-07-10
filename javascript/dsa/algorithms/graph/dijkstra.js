
function dijkstra(graph, start) { // @viz:def
    const dist = {}; // @viz:init_dist
    const pq = new MinPriorityQueue(); // @viz:init_pq
    
    for (const node of graph.nodes) dist[node] = Infinity; // @viz:init_loop
    dist[start] = 0; // @viz:init_start
    pq.push({ node: start, dist: 0 }); // @viz:init_push

    while (!pq.isEmpty()) { // @viz:while
        const { node: u, dist: d } = pq.pop(); // @viz:pop

        if (d > dist[u]) continue; // @viz:skip_check

        for (const { node: v, weight } of graph.neighbors(u)) { // @viz:loop_edges
            const newDist = dist[u] + weight; // @viz:calc_dist
            
            if (newDist < dist[v]) { // @viz:relax_check
                dist[v] = newDist; // @viz:update_dist
                pq.push({ node: v, dist: newDist }); // @viz:push_pq
            }
        }
    }
    return dist; // @viz:return
}
