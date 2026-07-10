class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<long>> dp(n + 1, vector<long>(3, 0)); // @viz: init
        
        dp[0][0] = INT_MIN; // @viz: base
        dp[0][1] = 0; // @viz: base
        dp[0][2] = 0; // @viz: base
        
        for (int i = 1; i <= n; i++) { // @viz: loop
            dp[i][0] = max(dp[i-1][0], dp[i-1][2] - prices[i-1]); // @viz: hold_update
            dp[i][1] = dp[i-1][0] + prices[i-1]; // @viz: sold_update
            dp[i][2] = max(dp[i-1][2], dp[i-1][1]); // @viz: rest_update
        }
        return (int)max(dp[n][1], dp[n][2]); // @viz: result
    }
};