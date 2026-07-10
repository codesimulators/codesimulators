func lengthOfLIS(nums []int) int {
    n := len(nums)
    if n == 0 { return 0 }
    
    dp := make([]int, n) // @viz: init
    for i := range dp { dp[i] = 1 }
    
    for i := 1; i < n; i++ { // @viz: loopI
        for j := 0; j < i; j++ { // @viz: loopJ
            if nums[j] < nums[i] { // @viz: check
                dp[i] = max(dp[i], dp[j] + 1) // @viz: update
            }
        }
    }
    
    res := 0
    for _, v := range dp { if v > res { res = v } }
    return res // @viz: result
}