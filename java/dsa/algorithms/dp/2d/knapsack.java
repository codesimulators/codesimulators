class Solution {
    public int knapsack(int[] weights, int[] values, int W) {
        int n = weights.length;
        int[][] dp = new int[n + 1][W + 1]; // @viz: init
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int w = 1; w <= W; w++) { // @viz: loopW
                if (weights[i - 1] <= w) { // @viz: weightCheck
                    int take = values[i - 1] + dp[i - 1][w - weights[i - 1]]; // @viz: take
                    int skip = dp[i - 1][w]; // @viz: skip
                    dp[i][w] = Math.max(take, skip); // @viz: compare
                } else {
                    dp[i][w] = dp[i - 1][w]; // @viz: skipOnly
                }
            }
        }
        return dp[n][W]; // @viz: return
    }
}