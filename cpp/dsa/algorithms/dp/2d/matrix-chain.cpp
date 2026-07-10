class Solution {
public:
    int matrixChainOrder(vector<int>& dims) {
        int n = dims.size() - 1;
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0)); // @viz: init
        
        for (int len = 2; len <= n; len++) { // @viz: loopLen
            for (int i = 1; i <= n - len + 1; i++) { // @viz: loopI
                int j = i + len - 1;
                dp[i][j] = INT_MAX; // @viz: loopJ
                
                for (int k = i; k < j; k++) { // @viz: loopK
                    int cost = dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j]; // @viz: compute
                    if (cost < dp[i][j]) { // @viz: check
                        dp[i][j] = cost; // @viz: update
                    }
                }
            }
        }
        return dp[1][n]; // @viz: result
    }
};