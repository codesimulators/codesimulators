func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([][]int, n)
    for i := range dp { dp[i] = make([]int, len(triangle[i])) } // @viz: init
    
    for j := 0; j < n; j++ { // @viz: baseInit
        dp[n-1][j] = triangle[n-1][j] // @viz: baseInit
    }
    
    for i := n - 2; i >= 0; i-- { // @viz: loopI
        for j := 0; j <= i; j++ { // @viz: loopJ
            left := dp[i+1][j] // @viz: computePrep
            right := dp[i+1][j+1] // @viz: computePrep
            
            dp[i][j] = triangle[i][j] + min(left, right) // @viz: compute
        }
    }
    return dp[0][0] // @viz: return
}