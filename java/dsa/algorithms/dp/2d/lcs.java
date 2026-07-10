class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int n = text1.length(), m = text2.length();
        // 1️⃣ DP table for matches
        int[][] dp = new int[n + 1][m + 1]; // @viz: init
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int j = 1; j <= m; j++) { // @viz: loopJ
                if (text1.charAt(i-1) == text2.charAt(j-1)) { // @viz: ifMatch
                    dp[i][j] = 1 + dp[i-1][j-1]; // @viz: match
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); // @viz: skip
                }
            }
        }
        return dp[n][m]; // @viz: result
    }
}