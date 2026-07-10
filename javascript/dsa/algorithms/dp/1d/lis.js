function lengthOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    
    // dp[i] is length of LIS ending at index i
    const dp = Array(n).fill(1); // @viz: init
    
    for (let i = 1; i < n; i++) { // @viz: loopI
        for (let j = 0; j < i; j++) { // @viz: loopJ
            if (nums[j] < nums[i]) { // @viz: check
                dp[i] = Math.max(dp[i], dp[j] + 1); // @viz: update
            }
        }
    }
    
    return Math.max(...dp); // @viz: result
}