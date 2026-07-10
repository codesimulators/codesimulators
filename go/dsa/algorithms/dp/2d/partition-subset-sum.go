func canPartition(nums []int) bool {
    sum := 0
    for _, num := range nums { sum += num } // @viz: initSum
    if sum % 2 != 0 { return false } // @viz: oddCheck
    
    target := sum / 2 // @viz: targetCalc
    n := len(nums)
    dp := make([][]bool, n + 1)
    for i := range dp { dp[i] = make([]bool, target + 1) } // @viz: init
    
    for i := 0; i <= n; i++ { // @viz: baseInit
        dp[i][0] = true
    }
    
    for i := 1; i <= n; i++ { // @viz: loopI
        for j := 1; j <= target; j++ { // @viz: loopJ
            if nums[i - 1] <= j { // @viz: weightCheck
                take := dp[i - 1][j - nums[i - 1]] // @viz: take
                skip := dp[i - 1][j] // @viz: skip
                dp[i][j] = take || skip // @viz: compare
            } else {
                dp[i][j] = dp[i - 1][j] // @viz: skipOnly
            }
        }
    }
    return dp[n][target] // @viz: return
}