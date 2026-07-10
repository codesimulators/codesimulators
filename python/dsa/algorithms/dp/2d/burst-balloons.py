class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        n = len(nums)
        vals = [1] + nums + [1] # @viz: init
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        
        for length in range(1, n + 1): # @viz: loop
            for i in range(1, n - length + 2): # @viz: interval_start
                j = i + length - 1
                max_val = 0
                for k in range(i, j + 1): # @viz: k_check
                    left = dp[i][k-1]
                    right = dp[k+1][j]
                    burst = vals[i-1] * vals[k] * vals[j+1]
                    max_val = max(max_val, left + right + burst)
                dp[i][j] = max_val # @viz: interval_update
                
        return dp[1][n] # @viz: result