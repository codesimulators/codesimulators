func minFallingPathSum(matrix [][]int) int {
    n := len(matrix)
    dp := make([][]int, n)
    for i := range dp { dp[i] = make([]int, n) } // @viz: init
    for j := 0; j < n; j++ { // @viz: baseInit
        dp[0][j] = matrix[0][j] // @viz: baseInit
    }
    
    for i := 1; i < n; i++ { // @viz: loopI
        for j := 0; j < n; j++ { // @viz: loopJ
            mid := dp[i-1][j] // @viz: computePrep
            left, right := 100000, 100000 // @viz: computePrep
            if j > 0 { left = dp[i-1][j-1] } // @viz: computePrep
            if j < n-1 { right = dp[i-1][j+1] } // @viz: computePrep
            
            dp[i][j] = matrix[i][j] + min(mid, min(left, right)) // @viz: compute
        }
    }
    res := dp[n-1][0] // @viz: return
    for _, v := range dp[n-1] { if v < res { res = v } }
    return res
}