class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> vals(n + 2, 1); // @viz: init
        for (int i = 0; i < n; i++) vals[i + 1] = nums[i];
        
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        
        for (int len = 1; len <= n; len++) { // @viz: loop
            for (int i = 1; i <= n - len + 1; i++) { // @viz: interval_start
                int j = i + len - 1;
                int maxVal = 0;
                for (int k = i; k <= j; k++) { // @viz: k_check
                    int left = dp[i][k-1];
                    int right = dp[k+1][j];
                    int burst = vals[i-1] * vals[k] * vals[j+1];
                    maxVal = max(maxVal, left + right + burst);
                }
                dp[i][j] = maxVal; // @viz: interval_update
            }
        }
        return dp[1][n]; // @viz: result
    }
};