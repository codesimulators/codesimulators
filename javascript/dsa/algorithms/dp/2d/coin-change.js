function coinChange(coins, amount) {
    const n = coins.length;
    // 1️⃣ Initialize DP table with ∞
    const dp = Array(n + 1).fill(0).map(() => Array(amount + 1).fill(Infinity)); // @viz: init
    
    // 2️⃣ Base case: 0 coins to make amount 0
    for (let i = 0; i <= n; i++) dp[i][0] = 0; // @viz: base

    for (let i = 1; i <= n; i++) { // @viz: loopI
        for (let j = 1; j <= amount; j++) { // @viz: loopJ
            if (coins[i-1] <= j) { // @viz: ifTake
                // 3️⃣ Take = 1 + optimal coins for remaining target
                // 4️⃣ Skip = value from row above (without this coin)
                dp[i][j] = Math.min(dp[i-1][j], 1 + dp[i][j - coins[i-1]]); // @viz: take
            } else {
                dp[i][j] = dp[i-1][j]; // @viz: skip
            }
        }
    }

    return dp[n][amount] === Infinity ? -1 : dp[n][amount]; // @viz: result
}