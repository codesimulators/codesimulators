func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][]int, n + 1) // @viz: init
    for i := range dp { dp[i] = make([]int, 2) }
    
    dp[0][0] = 0 // @viz: base
    dp[0][1] = -1e9 // @viz: base
    
    for i := 1; i <= n; i++ { // @viz: loop
        // Option 1: Not Holding
        skip := dp[i-1][0] // @viz: empty_options
        sell := dp[i-1][1] + prices[i-1] // @viz: empty_options
        if skip > sell { // @viz: empty_update
            dp[i][0] = skip
        } else {
            dp[i][0] = sell
        }
        
        // Option 2: Holding
        stay := dp[i-1][1] // @viz: holding_options
        buy := dp[i-1][0] - prices[i-1] // @viz: holding_options
        if stay > buy { // @viz: holding_update
            dp[i][1] = stay
        } else {
            dp[i][1] = buy
        }
    }
    return dp[n][0] // @viz: result
}