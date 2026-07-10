def solve_tsp(dist):
    n = len(dist)
    dp = [[float('inf')] * n for _ in range(1 << n)] # @viz: init
    
    dp[1][0] = 0 # @viz: base
    
    for mask in range(1, 1 << n): # @viz: loopMask
        for u in range(n): # @viz: loopU
            if not (mask & (1 << u)): continue
            
            for v in range(n): # @viz: loopV
                if mask & (1 << v): continue
                
                next_mask = mask | (1 << v) # @viz: next
                cost = dp[mask][u] + dist[u][v] # @viz: compute
                if cost < dp[next_mask][v]: # @viz: check
                    dp[next_mask][v] = cost # @viz: update
                    
    min_cost = float('inf') # @viz: resultInit
    for i in range(1, n): # @viz: resultLoop
        total = dp[(1 << n) - 1][i] + dist[i][0] # @viz: resultCompute
        if total < min_cost: # @viz: resultCheck
            min_cost = total # @viz: resultUpdate
            
    return min_cost # @viz: result