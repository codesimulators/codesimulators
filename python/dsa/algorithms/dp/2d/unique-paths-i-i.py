class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [[0] * n for _ in range(m)] # @viz: init
        
        if obstacleGrid[0][0] == 1: # @viz: baseCheck
            return 0 # @viz: baseReturn
        dp[0][0] = 1 # @viz: baseSet
        
        for i in range(m): # @viz: loopI
            for j in range(n): # @viz: loopJ
                if i == 0 and j == 0: # @viz: skipStart
                    continue # @viz: skipStartAction
                if obstacleGrid[i][j] == 1: # @viz: obstacleCheck
                    dp[i][j] = 0 # @viz: obstacleSet
                else:
                    top = dp[i-1][j] if i > 0 else 0 # @viz: computePrep
                    left = dp[i][j-1] if j > 0 else 0 # @viz: computePrep
                    dp[i][j] = top + left # @viz: compute
        return dp[m-1][n-1] # @viz: return