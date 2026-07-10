class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n, m = len(word1), len(word2)
        dp = [[0] * (m + 1) for _ in range(n + 1)] # @viz: init
        
        for i in range(n + 1): dp[i][0] = i
        for j in range(m + 1): dp[0][j] = j
        
        for i in range(1, n + 1): # @viz: loopI
            for j in range(1, m + 1): # @viz: loopJ
                if word1[i-1] == word2[j-1]: # @viz: ifMatch
                    dp[i][j] = dp[i-1][j-1] # @viz: match
                else:
                    dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]) # @viz: mismatch
                    
        return dp[n][m] # @viz: result