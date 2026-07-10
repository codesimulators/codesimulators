func coinChange(coins []int, amount int) int {
    n := len(coins)
    const INF = 1000000000
    // 1️⃣ Initialize DP table
    dp := make([][]int, n + 1)
    for i := range dp {
        dp[i] = make([]int, amount + 1)
        for j := 1; j <= amount; j++ { dp[i][j] = INF } // @viz: init
    }
    
    // 2️⃣ Base case
    for i := 0; i <= n; i++ { dp[i][0] = 0 } // @viz: base
    
    for i := 1; i <= n; i++ { // @viz: loopI
        for j := 1; j <= amount; j++ { // @viz: loopJ
            if coins[i-1] <= j { // @viz: ifTake
                take := 1 + dp[i][j-coins[i-1]] // @viz: take
                if dp[i-1][j] < take { // @viz: take
                    dp[i][j] = dp[i-1][j] // @viz: take
                } else { // @viz: take
                    dp[i][j] = take // @viz: take
                }
            } else {
                dp[i][j] = dp[i-1][j] // @viz: skip
            }
        }
    }
    if dp[n][amount] >= INF { return -1 } // @viz: result
    return dp[n][amount]
}