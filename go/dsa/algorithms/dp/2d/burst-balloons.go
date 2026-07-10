func maxCoins(nums []int) int {
    n := len(nums)
    vals := make([]int, n + 2) // @viz: init
    vals[0], vals[n+1] = 1, 1
    for i := 0; i < n; i++ { vals[i+1] = nums[i] }
    
    dp := make([][]int, n + 2)
    for i := range dp { dp[i] = make([]int, n + 2) }
    
    for lenVal := 1; lenVal <= n; lenVal++ { // @viz: loop
        for i := 1; i <= n - lenVal + 1; i++ { // @viz: interval_start
            j := i + lenVal - 1
            maxVal := 0
            for k := i; k <= j; k++ { // @viz: k_check
                left := dp[i][k-1]
                right := dp[k+1][j]
                burst := vals[i-1] * vals[k] * vals[j+1]
                total := left + right + burst
                if total > maxVal {
                    maxVal = total
                }
            }
            dp[i][j] = maxVal // @viz: interval_update
        }
    }
    return dp[1][n] // @viz: result
}