class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        vector<int> dp(n, 1); // @viz: init
        
        for (int i = 1; i < n; i++) { // @viz: loopI
            for (int j = 0; j < i; j++) { // @viz: loopJ
                if (nums[j] < nums[i]) { // @viz: check
                    dp[i] = max(dp[i], dp[j] + 1); // @viz: update
                }
            }
        }
        
        return *max_element(dp.begin(), dp.end()); // @viz: result
    }
};