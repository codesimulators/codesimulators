class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[][] dp = new int[n][n]; // @viz: init
        for (int j = 0; j < n; j++) { // @viz: baseInit
            dp[0][j] = matrix[0][j]; // @viz: baseInit
        }
        
        for (int i = 1; i < n; i++) { // @viz: loopI
            for (int j = 0; j < n; j++) { // @viz: loopJ
                int mid = dp[i-1][j]; // @viz: computePrep
                int left = j > 0 ? dp[i-1][j-1] : Integer.MAX_VALUE; // @viz: computePrep
                int right = j < n - 1 ? dp[i-1][j+1] : Integer.MAX_VALUE; // @viz: computePrep
                
                dp[i][j] = matrix[i][j] + Math.min(mid, Math.min(left, right)); // @viz: compute
            }
        }
        int min = dp[n-1][0]; // @viz: return
        for (int val : dp[n-1]) min = Math.min(min, val);
        return min;
    }
}