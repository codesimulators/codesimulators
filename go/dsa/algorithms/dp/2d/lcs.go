func longestCommonSubsequence(text1 string, text2 string) int {
    n, m := len(text1), len(text2)
    // 1️⃣ Initialize Grid
    dp := make([][]int, n + 1) // @viz: init
    for i := range dp {
        dp[i] = make([]int, m + 1)
    }
    
    for i := 1; i <= n; i++ { // @viz: loopI
        for j := 1; j <= m; j++ { // @viz: loopJ
            if text1[i-1] == text2[j-1] { // @viz: ifMatch
                dp[i][j] = 1 + dp[i-1][j-1] // @viz: match
            } else {
                up := dp[i-1][j]
                left := dp[i][j-1]
                if up > left { // @viz: skip
                    dp[i][j] = up
                } else {
                    dp[i][j] = left
                }
            }
        }
    }
    return dp[n][m] // @viz: result
}