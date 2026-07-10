class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums) # @viz: initSum
        if total % 2 != 0: # @viz: oddCheck
            return False
            
        target = total // 2 # @viz: targetCalc
        n = len(nums)
        dp = [[False] * (target + 1) for _ in range(n + 1)] # @viz: init
        
        for i in range(n + 1): # @viz: baseInit
            dp[i][0] = True
            
        for i in range(1, n + 1): # @viz: loopI
            for j in range(1, target + 1): # @viz: loopJ
                if nums[i - 1] <= j: # @viz: weightCheck
                    take = dp[i - 1][j - nums[i - 1]] # @viz: take
                    skip = dp[i - 1][j] # @viz: skip
                    dp[i][j] = take or skip # @viz: compare
                else:
                    dp[i][j] = dp[i - 1][j] # @viz: skipOnly
                    
        return dp[n][target] # @viz: return