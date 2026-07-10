class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[][] dp = new int[n][n]; // @viz: init
        
        for (int j = 0; j < n; j++) { // @viz: baseInit
            dp[n-1][j] = triangle.get(n-1).get(j); // @viz: baseInit
        }
        
        for (int i = n - 2; i >= 0; i--) { // @viz: loopI
            for (int j = 0; j <= i; j++) { // @viz: loopJ
                int left = dp[i+1][j]; // @viz: computePrep
                int right = dp[i+1][j+1]; // @viz: computePrep
                
                dp[i][j] = triangle.get(i).get(j) + Math.min(left, right); // @viz: compute
            }
        }
        return dp[0][0]; // @viz: return
    }
}