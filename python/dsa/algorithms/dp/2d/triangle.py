class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = [row[:] for row in triangle] # @viz: init
        
        for j in range(n): # @viz: baseInit
            dp[n-1][j] = triangle[n-1][j] # @viz: baseInit
            
        for i in range(n-2, -1, -1): # @viz: loopI
            for j in range(i + 1): # @viz: loopJ
                left = dp[i+1][j] # @viz: computePrep
                right = dp[i+1][j+1] # @viz: computePrep
                
                dp[i][j] = triangle[i][j] + min(left, right) # @viz: compute
        return dp[0][0] # @viz: return