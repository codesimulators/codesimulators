function maxCoins(nums) {
    const n = nums.length;
    // Pad boundaries with 1
    const vals = [1, ...nums, 1]; // @viz: init
    const dp = Array(n + 2).fill(0).map(() => Array(n + 2).fill(0));
    
    // DP transition
    for (let len = 1; len <= n; len++) { // @viz: loop
        for (let i = 1; i <= n - len + 1; i++) { // @viz: interval_start
            const j = i + len - 1;
            let maxVal = 0;
            
            // Choose balloon k to burst last in interval [i, j]
            for (let k = i; k <= j; k++) { // @viz: k_check
                const left = dp[i][k-1];
                const right = dp[k+1][j];
                const burst = vals[i-1] * vals[k] * vals[j+1];
                maxVal = Math.max(maxVal, left + right + burst);
            }
            dp[i][j] = maxVal; // @viz: interval_update
        }
    }
    
    return dp[1][n]; // @viz: result
}