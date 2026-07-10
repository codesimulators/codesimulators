class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n + 1][2]; // @viz: init
        
        dp[0][0] = 0; // @viz: base
        dp[0][1] = Integer.MIN_VALUE; // @viz: base
        
        for (int i = 1; i <= n; i++) { // @viz: loop
            // Option 1: Not Holding
            int skip = dp[i-1][0]; // @viz: empty_options
            int sell = (dp[i-1][1] == Integer.MIN_VALUE) ? Integer.MIN_VALUE : dp[i-1][1] + prices[i-1]; // @viz: empty_options
            dp[i][0] = Math.max(skip, sell); // @viz: empty_update
            
            // Option 2: Holding
            int stay = dp[i-1][1]; // @viz: holding_options
            int buy = dp[i-1][0] - prices[i-1]; // @viz: holding_options
            dp[i][1] = Math.max(stay, buy); // @viz: holding_update
        }
        return dp[n][0]; // @viz: result
    }
}