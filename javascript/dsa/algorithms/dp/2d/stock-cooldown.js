function maxProfit(prices) {
    const n = prices.length;
    // dp[day][state] -> 0=hold, 1=sold, 2=rest
    const dp = Array(n + 1).fill(0).map(() => Array(3).fill(0)); // @viz: init
    
    dp[0][0] = -Infinity; // @viz: base
    dp[0][1] = 0; // @viz: base
    dp[0][2] = 0; // @viz: base
    
    for (let i = 1; i <= n; i++) { // @viz: loop
        // Update hold: max(hold[i-1], rest[i-1] - price)
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][2] - prices[i-1]); // @viz: hold_update
        
        // Update sold: hold[i-1] + price
        dp[i][1] = dp[i-1][0] + prices[i-1]; // @viz: sold_update
        
        // Update rest: max(rest[i-1], sold[i-1])
        dp[i][2] = Math.max(dp[i-1][2], dp[i-1][1]); // @viz: rest_update
    }
    
    return Math.max(dp[n][1], dp[n][2]); // @viz: result
}