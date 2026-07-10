
def bellmanFord(V, edges, source): # @viz:def
    dist = [float('inf')] * V # @viz:init
    dist[source] = 0 # @viz:init

    for _ in range(V - 1): # @viz:loop_v
        for u, v, w in edges: # @viz:loop_e
            if dist[u] != float('inf') and dist[u] + w < dist[v]: # @viz:check
                dist[v] = dist[u] + w # @viz:relax

    for u, v, w in edges: # @viz:audit
        if dist[u] != float('inf') and dist[u] + w < dist[v]: # @viz:audit_check
            return "Negative Cycle" # @viz:error

    return dist # @viz:return
