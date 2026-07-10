func minDistance(word1 string, word2 string) int {
    n, m := len(word1), len(word2)
    dp := make([][]int, n + 1) // @viz: init
    for i := range dp { dp[i] = make([]int, m + 1) }

    for i := 0; i <= n; i++ { dp[i][0] = i }
    for j := 0; j <= m; j++ { dp[0][j] = j }

    for i := 1; i <= n; i++ { // @viz: loopI
        for j := 1; j <= m; j++ { // @viz: loopJ
            if word1[i-1] == word2[j-1] { // @viz: ifMatch
                dp[i][j] = dp[i-1][j-1] // @viz: match
            } else {
                dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) // @viz: mismatch
            }
        }
    }
    return dp[n][m] // @viz: result
}

func min(a, b, c int) int {
    if a <= b && a <= c { return a }
    if b <= a && b <= c { return b }
    return c
}