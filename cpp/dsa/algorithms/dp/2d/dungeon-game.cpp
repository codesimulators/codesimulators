class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int m = dungeon.size();
        int n = dungeon[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0)); // @viz: init
        
        dp[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1]); // @viz: baseInit
        
        for (int j = n - 2; j >= 0; j--) { // @viz: baseRowInit
            dp[m-1][j] = max(1, dp[m-1][j+1] - dungeon[m-1][j]);
        }
        for (int i = m - 2; i >= 0; i--) { // @viz: baseColInit
            dp[i][n-1] = max(1, dp[i+1][n-1] - dungeon[i][n-1]);
        }
        
        for (int i = m - 2; i >= 0; i--) { // @viz: loopI
            for (int j = n - 2; j >= 0; j--) { // @viz: loopJ
                int right = dp[i][j+1]; // @viz: computePrep
                int down = dp[i+1][j]; // @viz: computePrep
                
                dp[i][j] = max(1, min(right, down) - dungeon[i][j]); // @viz: compute
            }
        }
        return dp[0][0]; // @viz: return
    }
};