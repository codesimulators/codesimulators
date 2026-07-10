class Solution {
public:
    int knapsack(vector<int>& weights, vector<int>& values, int W) {
        int n = weights.size();
        vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0)); // @viz: init
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int w = 1; w <= W; w++) { // @viz: loopW
                if (weights[i - 1] <= w) { // @viz: weightCheck
                    int take = values[i - 1] + dp[i - 1][w - weights[i - 1]]; // @viz: take
                    int skip = dp[i - 1][w]; // @viz: skip
                    dp[i][w] = max(take, skip); // @viz: compare
                } else {
                    dp[i][w] = dp[i - 1][w]; // @viz: skipOnly
                }
            }
        }
        return dp[n][W]; // @viz: return
    }
};