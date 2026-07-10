class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        int INF = 1e9;
        // 1️⃣ Initialize DP table
        vector<vector<int>> dp(n + 1, vector<int>(amount + 1, INF)); // @viz: init
        
        // 2️⃣ Base case
        for (int i = 0; i <= n; i++) dp[i][0] = 0; // @viz: base
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int j = 1; j <= amount; j++) { // @viz: loopJ
                if (coins[i-1] <= j) { // @viz: ifTake
                    dp[i][j] = min(dp[i-1][j], 1 + dp[i][j - coins[i-1]]); // @viz: take
                } else {
                    dp[i][j] = dp[i-1][j]; // @viz: skip
                }
            }
        }
        return dp[n][amount] >= INF ? -1 : dp[n][amount]; // @viz: result
    }
};