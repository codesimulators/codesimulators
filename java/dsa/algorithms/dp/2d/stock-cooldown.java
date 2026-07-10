class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n + 1][3]; // @viz: init
        
        dp[0][0] = Integer.MIN_VALUE; // @viz: base
        dp[0][1] = 0; // @viz: base
        dp[0][2] = 0; // @viz: base
        
        for (int i = 1; i <= n; i++) { // @viz: loop
            int buy = (dp[i-1][2] == Integer.MIN_VALUE) ? Integer.MIN_VALUE : dp[i-1][2] - prices[i-1];
            dp[i][0] = Math.max(dp[i-1][0], buy); // @viz: hold_update
            
            int sell = (dp[i-1][0] == Integer.MIN_VALUE) ? Integer.MIN_VALUE : dp[i-1][0] + prices[i-1];
            dp[i][1] = sell; // @viz: sold_update
            
            dp[i][2] = Math.max(dp[i-1][2], dp[i-1][1]); // @viz: rest_update
        }
        return Math.max(dp[n][1], dp[n][2]); // @viz: result
    }
}