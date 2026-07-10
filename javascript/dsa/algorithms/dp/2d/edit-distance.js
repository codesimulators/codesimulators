function minDistance(word1, word2) {
    const n = word1.length, m = word2.length;
    const dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0)); // @viz: init
    
    // Base cases: empty strings
    for (let i = 0; i <= n; i++) dp[i][0] = i; 
    for (let j = 0; j <= m; j++) dp[0][j] = j; 

    for (let i = 1; i <= n; i++) { // @viz: loopI
        for (let j = 1; j <= m; j++) { // @viz: loopJ
            if (word1[i-1] === word2[j-1]) { // @viz: ifMatch
                dp[i][j] = dp[i-1][j-1]; // @viz: match
            } else {
                dp[i][j] = 1 + Math.min( // @viz: mismatch
                    dp[i][j-1],   // Insert
                    dp[i-1][j],   // Delete
                    dp[i-1][j-1]  // Replace
                );
            }
        }
    }
    return dp[n][m]; // @viz: result
}