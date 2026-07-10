var canPartition = function(nums) {
    const sum = nums.reduce((a, b) => a + b, 0); // @viz: initSum
    if (sum % 2 !== 0) return false; // @viz: oddCheck
    
    const target = sum / 2; // @viz: targetCalc
    const n = nums.length;
    let dp = Array(n + 1).fill().map(() => Array(target + 1).fill(false)); // @viz: init
    
    for (let i = 0; i <= n; i++) { // @viz: baseInit
        dp[i][0] = true;
    }
    
    for (let i = 1; i <= n; i++) { // @viz: loopI
        for (let j = 1; j <= target; j++) { // @viz: loopJ
            if (nums[i - 1] <= j) { // @viz: weightCheck
                const take = dp[i - 1][j - nums[i - 1]]; // @viz: take
                const skip = dp[i - 1][j]; // @viz: skip
                dp[i][j] = take || skip; // @viz: compare
            } else {
                dp[i][j] = dp[i - 1][j]; // @viz: skipOnly
            }
        }
    }
    return dp[n][target]; // @viz: return
};