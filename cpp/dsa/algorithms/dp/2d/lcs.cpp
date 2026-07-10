class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size(), m = text2.size();
        // 1️⃣ Initialize Grid
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0)); // @viz: init
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int j = 1; j <= m; j++) { // @viz: loopJ
                if (text1[i-1] == text2[j-1]) { // @viz: ifMatch
                    dp[i][j] = 1 + dp[i-1][j-1]; // @viz: match
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]); // @viz: skip
                }
            }
        }
        return dp[n][m]; // @viz: result
    }
};