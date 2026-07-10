function maxProfit(prices) {
    const n = prices.length;
    // 1️⃣ Initialize DP table
    const dp = Array(n + 1).fill(0).map(() => Array(2).fill(0)); // @viz: init
    
    // 2️⃣ Base Case: Before any days
    dp[0][0] = 0; // @viz: base
    dp[0][1] = -Infinity; // @viz: base
    
    for (let i = 1; i <= n; i++) { // @viz: loop
        // Option 1: Not Holding Stock
        const skip = dp[i-1][0]; // @viz: empty_options
        const sell = dp[i-1][1] + prices[i-1]; // @viz: empty_options
        dp[i][0] = Math.max(skip, sell); // @viz: empty_update
        
        // Option 2: Holding Stock
        const stay = dp[i-1][1]; // @viz: holding_options
        const buy = dp[i-1][0] - prices[i-1]; // @viz: holding_options
        dp[i][1] = Math.max(stay, buy); // @viz: holding_update
    }
    
    return dp[n][0]; // @viz: result
}