int solveTSP(vector<vector<int>>& dist) {
    int n = dist.size();
    vector<vector<int>> dp(1 << n, vector<int>(n, 1e9)); // @viz: init
    
    dp[1][0] = 0; // @viz: base
    
    for (int mask = 1; mask < (1 << n); ++mask) { // @viz: loopMask
        for (int u = 0; u < n; ++u) { // @viz: loopU
            if (!(mask & (1 << u))) continue;
            
            for (int v = 0; v < n; ++v) { // @viz: loopV
                if (mask & (1 << v)) continue;
                
                int nextMask = mask | (1 << v); // @viz: next
                int cost = dp[mask][u] + dist[u][v]; // @viz: compute
                if (cost < dp[nextMask][v]) { // @viz: check
                    dp[nextMask][v] = cost; // @viz: update
                }
            }
        }
    }
    
    int minCost = 1e9; // @viz: resultInit
    for (int i = 1; i < n; ++i) { // @viz: resultLoop
        int total = dp[(1 << n) - 1][i] + dist[i][0]; // @viz: resultCompute
        if (total < minCost) { // @viz: resultCheck
            minCost = total; // @viz: resultUpdate
        }
    }
    return minCost; // @viz: result
}