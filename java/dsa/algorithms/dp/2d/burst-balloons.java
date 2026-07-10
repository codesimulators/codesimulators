class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] vals = new int[n + 2]; // @viz: init
        vals[0] = 1;
        vals[n + 1] = 1;
        for (int i = 0; i < n; i++) vals[i + 1] = nums[i];
        
        int[][] dp = new int[n + 2][n + 2];
        
        for (int len = 1; len <= n; len++) { // @viz: loop
            for (int i = 1; i <= n - len + 1; i++) { // @viz: interval_start
                int j = i + len - 1;
                int maxVal = 0;
                for (int k = i; k <= j; k++) { // @viz: k_check
                    int left = dp[i][k-1];
                    int right = dp[k+1][j];
                    int burst = vals[i-1] * vals[k] * vals[j+1];
                    maxVal = Math.max(maxVal, left + right + burst);
                }
                dp[i][j] = maxVal; // @viz: interval_update
            }
        }
        return dp[1][n]; // @viz: result
    }
}