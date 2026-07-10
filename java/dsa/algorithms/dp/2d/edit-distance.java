class Solution {
    public int minDistance(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        int[][] dp = new int[n + 1][m + 1]; // @viz: init
        
        for (int i = 0; i <= n; i++) dp[i][0] = i;
        for (int j = 0; j <= m; j++) dp[0][j] = j;

        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int j = 1; j <= m; j++) { // @viz: loopJ
                if (word1.charAt(i-1) == word2.charAt(j-1)) { // @viz: ifMatch
                    dp[i][j] = dp[i-1][j-1]; // @viz: match
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1])); // @viz: mismatch
                }
            }
        }
        return dp[n][m]; // @viz: result
    }
}