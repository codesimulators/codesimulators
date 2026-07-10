class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m, n = len(dungeon), len(dungeon[0])
        dp = [[0] * n for _ in range(m)] # @viz: init
        
        dp[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1]) # @viz: baseInit
        
        for j in range(n-2, -1, -1): # @viz: baseRowInit
            dp[m-1][j] = max(1, dp[m-1][j+1] - dungeon[m-1][j])
            
        for i in range(m-2, -1, -1): # @viz: baseColInit
            dp[i][n-1] = max(1, dp[i+1][n-1] - dungeon[i][n-1])
            
        for i in range(m-2, -1, -1): # @viz: loopI
            for j in range(n-2, -1, -1): # @viz: loopJ
                right = dp[i][j+1] # @viz: computePrep
                down = dp[i+1][j] # @viz: computePrep
                
                dp[i][j] = max(1, min(right, down) - dungeon[i][j]) # @viz: compute
                
        return dp[0][0] # @viz: return