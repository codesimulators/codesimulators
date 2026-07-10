class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        
        int[] dp = new int[n]; // @viz: init
        Arrays.fill(dp, 1);
        
        for (int i = 1; i < n; i++) { // @viz: loopI
            for (int j = 0; j < i; j++) { // @viz: loopJ
                if (nums[j] < nums[i]) { // @viz: check
                    dp[i] = Math.max(dp[i], dp[j] + 1); // @viz: update
                }
            }
        }
        
        int max = 1;
        for (int val : dp) max = Math.max(max, val);
        return max; // @viz: result
    }
}