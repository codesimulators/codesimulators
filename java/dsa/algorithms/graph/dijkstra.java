
public Map<String, Integer> dijkstra(Graph graph, String start) { // @viz:def
    Map<String, Integer> dist = new HashMap<>(); // @viz:init_dist
    PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> a.dist - b.dist); // @viz:init_pq

    for (String node : graph.nodes()) dist.put(node, Integer.MAX_VALUE); // @viz:init_loop
    dist.put(start, 0); // @viz:init_start
    pq.add(new Node(start, 0)); // @viz:init_push

    while (!pq.isEmpty()) { // @viz:while
        Node current = pq.poll(); // @viz:pop
        String u = current.name; // @viz:pop
        int d = current.dist; // @viz:pop

        if (d > dist.get(u)) continue; // @viz:skip_check

        for (Edge edge : graph.neighbors(u)) { // @viz:loop_edges
            String v = edge.to; // @viz:loop_edges
            int newDist = d + edge.weight; // @viz:calc_dist

            if (newDist < dist.get(v)) { // @viz:relax_check
                dist.put(v, newDist); // @viz:update_dist
                pq.add(new Node(v, newDist)); // @viz:push_pq
            }
        }
    }
    return dist; // @viz:return
}
