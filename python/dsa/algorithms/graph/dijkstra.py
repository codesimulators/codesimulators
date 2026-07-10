
def dijkstra(graph, start): # @viz:def
    dist = {node: float('inf') for node in graph} # @viz:init_dist @viz:init_loop
    dist[start] = 0 # @viz:init_start
    pq = [(0, start)] # @viz:init_pq @viz:init_push

    while pq: # @viz:while
        d, u = heapq.heappop(pq) # @viz:pop

        if d > dist[u]: continue # @viz:skip_check

        for v, weight in graph[u]: # @viz:loop_edges
            new_dist = d + weight # @viz:calc_dist
            
            if new_dist < dist[v]: # @viz:relax_check
                dist[v] = new_dist # @viz:update_dist
                heapq.heappush(pq, (new_dist, v)) # @viz:push_pq
                
    return dist # @viz:return
