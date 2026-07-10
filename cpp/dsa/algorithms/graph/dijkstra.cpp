
unordered_map<string, int> dijkstra(Graph& graph, string start) { // @viz:def
    unordered_map<string, int> dist; // @viz:init_dist
    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> pq; // @viz:init_pq

    for (auto& node : graph.nodes) dist[node] = INT_MAX; // @viz:init_loop
    dist[start] = 0; // @viz:init_start
    pq.push({0, start}); // @viz:init_push

    while (!pq.empty()) { // @viz:while
        auto [d, u] = pq.top(); // @viz:pop
        pq.pop(); // @viz:pop

        if (d > dist[u]) continue; // @viz:skip_check

        for (auto& edge : graph.neighbors[u]) { // @viz:loop_edges
            string v = edge.to; // @viz:loop_edges
            int newDist = d + edge.weight; // @viz:calc_dist

            if (newDist < dist[v]) { // @viz:relax_check
                dist[v] = newDist; // @viz:update_dist
                pq.push({newDist, v}); // @viz:push_pq
            }
        }
    }
    return dist; // @viz:return
}
