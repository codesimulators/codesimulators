class Solution {
    public int coinChange(int[] coins, int amount) {
        int n = coins.length;
        int INF = 1000000000;
        // 1️⃣ Initialize DP table
        int[][] dp = new int[n + 1][amount + 1]; // @viz: init
        for (int i = 0; i <= n; i++) {
            for (int j = 1; j <= amount; j++) dp[i][j] = INF;
        }
        
        // 2️⃣ Base case
        for (int i = 0; i <= n; i++) dp[i][0] = 0; // @viz: base
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int j = 1; j <= amount; j++) { // @viz: loopJ
                if (coins[i-1] <= j) { // @viz: ifTake
                    dp[i][j] = Math.min(dp[i-1][j], 1 + dp[i][j - coins[i-1]]); // @viz: take
                } else {
                    dp[i][j] = dp[i-1][j]; // @viz: skip
                }
            }
        }
        return dp[n][amount] >= INF ? -1 : dp[n][amount]; // @viz: result
    }
}