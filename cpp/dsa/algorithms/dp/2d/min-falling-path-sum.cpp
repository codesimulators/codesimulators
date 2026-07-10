class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> dp(n, vector<int>(n, 0)); // @viz: init
        for (int j = 0; j < n; j++) { // @viz: baseInit
            dp[0][j] = matrix[0][j]; // @viz: baseInit
        }
        
        for (int i = 1; i < n; i++) { // @viz: loopI
            for (int j = 0; j < n; j++) { // @viz: loopJ
                int mid = dp[i-1][j]; // @viz: computePrep
                int left = (j > 0) ? dp[i-1][j-1] : INT_MAX; // @viz: computePrep
                int right = (j < n - 1) ? dp[i-1][j+1] : INT_MAX; // @viz: computePrep
                
                dp[i][j] = matrix[i][j] + min({mid, left, right}); // @viz: compute
            }
        }
        return *min_element(dp[n-1].begin(), dp[n-1].end()); // @viz: return
    }
};