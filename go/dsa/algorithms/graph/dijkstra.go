
func dijkstra(graph Graph, start string) map[string]int { // @viz:def
    dist := make(map[string]int) // @viz:init_dist
    pq := &PriorityQueue{} // @viz:init_pq
    heap.Init(pq) // @viz:init_pq

    for _, node := range graph.Nodes { dist[node] = math.MaxInt32 } // @viz:init_loop
    dist[start] = 0 // @viz:init_start
    heap.Push(pq, &Item{value: start, priority: 0}) // @viz:init_push

    for pq.Len() > 0 { // @viz:while
        item := heap.Pop(pq).(*Item) // @viz:pop
        u := item.value // @viz:pop
        d := item.priority // @viz:pop

        if d > dist[u] { continue } // @viz:skip_check

        for _, edge := range graph.Neighbors(u) { // @viz:loop_edges
            v := edge.To // @viz:loop_edges
            newDist := d + edge.Weight // @viz:calc_dist

            if newDist < dist[v] { // @viz:relax_check
                dist[v] = newDist // @viz:update_dist
                heap.Push(pq, &Item{value: v, priority: newDist}) // @viz:push_pq
            }
        }
    }
    return dist // @viz:return
}
