func uniquePathsWithObstacles(obstacleGrid [][]int) int {
    m := len(obstacleGrid)
    n := len(obstacleGrid[0])
    if obstacleGrid[0][0] == 1 { // @viz: baseCheck
        return 0 // @viz: baseReturn
    }
    
    dp := make([][]int, m) // @viz: init
    for i := range dp { dp[i] = make([]int, n) }
    dp[0][0] = 1 // @viz: baseSet
    
    for i := 0; i < m; i++ { // @viz: loopI
        for j := 0; j < n; j++ { // @viz: loopJ
            if i == 0 && j == 0 { // @viz: skipStart
                continue // @viz: skipStartAction
            }
            if obstacleGrid[i][j] == 1 { // @viz: obstacleCheck
                dp[i][j] = 0 // @viz: obstacleSet
            } else {
                top, left := 0, 0 // @viz: computePrep
                if i > 0 { // @viz: computePrep
                    top = dp[i-1][j] // @viz: computePrep
                }
                if j > 0 { // @viz: computePrep
                    left = dp[i][j-1] // @viz: computePrep
                }
                dp[i][j] = top + left // @viz: compute
            }
        }
    }
    return dp[m-1][n-1] // @viz: return
}