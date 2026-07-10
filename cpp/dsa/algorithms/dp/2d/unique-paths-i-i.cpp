class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1) { // @viz: baseCheck
            return 0; // @viz: baseReturn
        }
        
        vector<vector<long>> dp(m, vector<long>(n, 0)); // @viz: init
        dp[0][0] = 1; // @viz: baseSet
        
        for (int i = 0; i < m; i++) { // @viz: loopI
            for (int j = 0; j < n; j++) { // @viz: loopJ
                if (i == 0 && j == 0) { // @viz: skipStart
                    continue; // @viz: skipStartAction
                }
                if (obstacleGrid[i][j] == 1) { // @viz: obstacleCheck
                    dp[i][j] = 0; // @viz: obstacleSet
                } else {
                    long top = i > 0 ? dp[i-1][j] : 0; // @viz: computePrep
                    long left = j > 0 ? dp[i][j-1] : 0; // @viz: computePrep
                    dp[i][j] = top + left; // @viz: compute
                }
            }
        }
        return dp[m-1][n-1]; // @viz: return
    }
};