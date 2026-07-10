function longestCommonSubsequence(text1, text2) {
    const n = text1.length, m = text2.length;
    // 1️⃣ Initialize DP table with 0s
    const dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0)); // @viz: init
    
    for (let i = 1; i <= n; i++) { // @viz: loopI
        for (let j = 1; j <= m; j++) { // @viz: loopJ
            if (text1[i-1] === text2[j-1]) { // @viz: ifMatch
                // 2️⃣ Match: +1 from top-left diagonal
                dp[i][j] = 1 + dp[i-1][j-1]; // @viz: match
            } else {
                // 3️⃣ No Match: Max of top cell or left cell
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); // @viz: skip
            }
        }
    }
    
    return dp[n][m]; // @viz: result
}