func knapsack(weights []int, values []int, W int) int {
    n := len(weights)
    dp := make([][]int, n + 1)
    for i := range dp { dp[i] = make([]int, W + 1) } // @viz: init
    
    for i := 1; i <= n; i++ { // @viz: loopI
        for w := 1; w <= W; w++ { // @viz: loopW
            if weights[i - 1] <= w { // @viz: weightCheck
                take := values[i - 1] + dp[i - 1][w - weights[i - 1]] // @viz: take
                skip := dp[i - 1][w] // @viz: skip
                dp[i][w] = max(take, skip) // @viz: compare
            } else {
                dp[i][w] = dp[i - 1][w] // @viz: skipOnly
            }
        }
    }
    return dp[n][W] // @viz: return
}