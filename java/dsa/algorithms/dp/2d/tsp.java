public int solveTSP(int[][] dist) {
    int n = dist.length;
    int[][] dp = new int[1 << n][n]; // @viz: init
    for (int[] row : dp) Arrays.fill(row, 1000000000);
    
    dp[1][0] = 0; // @viz: base
    
    for (int mask = 1; mask < (1 << n); mask++) { // @viz: loopMask
        for (int u = 0; u < n; u++) { // @viz: loopU
            if ((mask & (1 << u)) == 0) continue;
            
            for (int v = 0; v < n; v++) { // @viz: loopV
                if ((mask & (1 << v)) != 0) continue;
                
                int nextMask = mask | (1 << v); // @viz: next
                int cost = dp[mask][u] + dist[u][v]; // @viz: compute
                if (cost < dp[nextMask][v]) { // @viz: check
                    dp[nextMask][v] = cost; // @viz: update
                }
            }
        }
    }
    
    int minCost = 1000000000; // @viz: resultInit
    for (int i = 1; i < n; i++) { // @viz: resultLoop
        int total = dp[(1 << n) - 1][i] + dist[i][0]; // @viz: resultCompute
        if (total < minCost) { // @viz: resultCheck
            minCost = total; // @viz: resultUpdate
        }
    }
    return minCost; // @viz: result
}