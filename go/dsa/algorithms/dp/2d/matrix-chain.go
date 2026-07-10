func matrixChainOrder(dims []int) int {
    n := len(dims) - 1
    dp := make([][]int, n + 1) // @viz: init
    for i := range dp { dp[i] = make([]int, n + 1) }
    
    for length := 2; length <= n; length++ { // @viz: loopLen
        for i := 1; i <= n - length + 1; i++ { // @viz: loopI
            j := i + length - 1
            dp[i][j] = 1 << 31 - 1 // @viz: loopJ
            
            for k := i; k < j; k++ { // @viz: loopK
                cost := dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j] // @viz: compute
                if cost < dp[i][j] { // @viz: check
                    dp[i][j] = cost // @viz: update
                }
            }
        }
    }
    return dp[1][n] // @viz: result
}