func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][]int, n + 1) // @viz: init
    for i := range dp { dp[i] = make([]int, 3) }
    
    dp[0][0] = -1e9 // @viz: base
    dp[0][1] = 0 // @viz: base
    dp[0][2] = 0 // @viz: base
    
    for i := 1; i <= n; i++ { // @viz: loop
        // Update hold
        buy := dp[i-1][2] - prices[i-1]
        if dp[i-1][0] > buy { // @viz: hold_update
            dp[i][0] = dp[i-1][0]
        } else {
            dp[i][0] = buy
        }
        
        // Update sold
        dp[i][1] = dp[i-1][0] + prices[i-1] // @viz: sold_update
        
        // Update rest
        if dp[i-1][2] > dp[i-1][1] { // @viz: rest_update
            dp[i][2] = dp[i-1][2]
        } else {
            dp[i][2] = dp[i-1][1]
        }
    }
    
    if dp[n][1] > dp[n][2] { // @viz: result
        return dp[n][1]
    }
    return dp[n][2]
}