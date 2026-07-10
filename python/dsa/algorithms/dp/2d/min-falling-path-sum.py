class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        dp = [[0] * n for _ in range(n)] # @viz: init
        
        for j in range(n): # @viz: baseInit
            dp[0][j] = matrix[0][j] # @viz: baseInit
            
        for i in range(1, n): # @viz: loopI
            for j in range(n): # @viz: loopJ
                mid = dp[i-1][j] # @viz: computePrep
                left = dp[i-1][j-1] if j > 0 else float('inf') # @viz: computePrep
                right = dp[i-1][j+1] if j < n - 1 else float('inf') # @viz: computePrep
                
                dp[i][j] = matrix[i][j] + min(mid, left, right) # @viz: compute
        return min(dp[-1]) # @viz: return