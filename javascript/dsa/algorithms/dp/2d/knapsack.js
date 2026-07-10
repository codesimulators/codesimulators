var knapsack = function(weights, values, W) {
    const n = weights.length;
    let dp = Array(n + 1).fill().map(() => Array(W + 1).fill(0)); // @viz: init
    
    for (let i = 1; i <= n; i++) { // @viz: loopI
        for (let w = 1; w <= W; w++) { // @viz: loopW
            if (weights[i - 1] <= w) { // @viz: weightCheck
                const take = values[i - 1] + dp[i - 1][w - weights[i - 1]]; // @viz: take
                const skip = dp[i - 1][w]; // @viz: skip
                dp[i][w] = Math.max(take, skip); // @viz: compare
            } else {
                dp[i][w] = dp[i - 1][w]; // @viz: skipOnly
            }
        }
    }
    return dp[n][W]; // @viz: return
};