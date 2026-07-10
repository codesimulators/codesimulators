class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) sum += num; // @viz: initSum
        if (sum % 2 != 0) return false; // @viz: oddCheck
        
        int target = sum / 2; // @viz: targetCalc
        int n = nums.length;
        boolean[][] dp = new boolean[n + 1][target + 1]; // @viz: init
        
        for (int i = 0; i <= n; i++) { // @viz: baseInit
            dp[i][0] = true;
        }
        
        for (int i = 1; i <= n; i++) { // @viz: loopI
            for (int j = 1; j <= target; j++) { // @viz: loopJ
                if (nums[i - 1] <= j) { // @viz: weightCheck
                    boolean take = dp[i - 1][j - nums[i - 1]]; // @viz: take
                    boolean skip = dp[i - 1][j]; // @viz: skip
                    dp[i][j] = take || skip; // @viz: compare
                } else {
                    dp[i][j] = dp[i - 1][j]; // @viz: skipOnly
                }
            }
        }
        return dp[n][target]; // @viz: return
    }
}