func maxEnvelopes(envelopes [][]int) int {
    n := len(envelopes)
    if n == 0 { return 0 } // @viz: init
    
    // 1️⃣ Sort: Width asc, Height desc
    sort.Slice(envelopes, func(i, j int) bool { // @viz: sort
        if envelopes[i][0] == envelopes[j][0] {
            return envelopes[i][1] > envelopes[j][1]
        }
        return envelopes[i][0] < envelopes[j][0]
    })
    
    // 2️⃣ DP LIS on Heights
    dp := make([]int, n) // @viz: lis_init
    maxNesting := 1
    
    for i := 0; i < n; i++ { // @viz: lis_i
        dp[i] = 1
        for j := 0; j < i; j++ { // @viz: lis_j
            if envelopes[j][1] < envelopes[i][1] { // @viz: lis_j
                if dp[j] + 1 > dp[i] { // @viz: lis_update
                    dp[i] = dp[j] + 1
                }
            }
        }
        if dp[i] > maxNesting {
            maxNesting = dp[i]
        }
    }
    return maxNesting // @viz: result
}