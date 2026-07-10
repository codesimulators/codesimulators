class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        if not nums: return 0
        
        dp = [1] * n # @viz: init
        
        for i in range(1, n): # @viz: loopI
            for j in range(i): # @viz: loopJ
                if nums[j] < nums[i]: # @viz: check
                    dp[i] = max(dp[i], dp[j] + 1) # @viz: update
                    
        return max(dp) # @viz: result