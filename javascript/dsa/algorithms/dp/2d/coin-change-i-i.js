function change(amount, coins) {
    // 1️⃣ Initialize DP table
    const dp = Array(amount + 1).fill(0); // @viz: init
    dp[0] = 1; // @viz: base
    
    // 2️⃣ Outer loop: Coins (guarantees combinations, not permutations)
    for (let coin of coins) { // @viz: coin_loop
        for (let i = coin; i <= amount; i++) { // @viz: i_check
            dp[i] += dp[i - coin]; // @viz: i_update
        }
    }
    
    return dp[amount]; // @viz: result
}