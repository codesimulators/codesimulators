class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<long>> dp(n + 1, vector<long>(2, 0)); // @viz: init
        
        dp[0][0] = 0; // @viz: base
        dp[0][1] = INT_MIN; // @viz: base
        
        for (int i = 1; i <= n; i++) { // @viz: loop
            // Option 1: Not Holding
            long skip = dp[i-1][0]; // @viz: empty_options
            long sell = dp[i-1][1] + prices[i-1]; // @viz: empty_options
            dp[i][0] = max(skip, sell); // @viz: empty_update
            
            // Option 2: Holding
            long stay = dp[i-1][1]; // @viz: holding_options
            long buy = dp[i-1][0] - prices[i-1]; // @viz: holding_options
            dp[i][1] = max(stay, buy); // @viz: holding_update
        }
        return (int)dp[n][0]; // @viz: result
    }
};