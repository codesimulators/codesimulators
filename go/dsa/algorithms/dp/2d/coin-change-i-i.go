func change(amount int, coins []int) int {
    dp := make([]int, amount + 1) // @viz: init
    dp[0] = 1 // @viz: base
    
    for _, coin := range coins { // @viz: coin_loop
        for i := coin; i <= amount; i++ { // @viz: i_check
            dp[i] += dp[i - coin] // @viz: i_update
        }
    }
    return dp[amount] // @viz: result
}