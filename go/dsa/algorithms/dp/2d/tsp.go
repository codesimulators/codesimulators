func solveTSP(dist [][]int) int {
    n := len(dist)
    dp := make([][]int, 1 << n) // @viz: init
    for i := range dp { 
        dp[i] = make([]int, n)
        for j := range dp[i] { dp[i][j] = 1e9 }
    }
    
    dp[1][0] = 0 // @viz: base
    
    for mask := 1; mask < (1 << n); mask++ { // @viz: loopMask
        for u := 0; u < n; u++ { // @viz: loopU
            if mask & (1 << u) == 0 { continue }
            
            for v := 0; v < n; v++ { // @viz: loopV
                if mask & (1 << v) != 0 { continue }
                
                nextMask := mask | (1 << v) // @viz: next
                cost := dp[mask][u] + dist[u][v] // @viz: compute
                if cost < dp[nextMask][v] { // @viz: check
                    dp[nextMask][v] = cost // @viz: update
                }
            }
        }
    }
    
    minCost := 1000000000 // @viz: resultInit
    for i := 1; i < n; i++ { // @viz: resultLoop
        total := dp[(1 << n) - 1][i] + dist[i][0] // @viz: resultCompute
        if total < minCost { // @viz: resultCheck
            minCost = total // @viz: resultUpdate
        }
    }
    return minCost // @viz: result
}