class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        # 1️⃣ Initialize DP table with 0s
        dp = [[0] * (m + 1) for _ in range(n + 1)] # @viz: init
        
        for i in range(1, n + 1): # @viz: loopI
            for j in range(1, m + 1): # @viz: loopJ
                if text1[i-1] == text2[j-1]: # @viz: ifMatch
                    # 2️⃣ Match: Solve(i-1, j-1) + 1
                    dp[i][j] = 1 + dp[i-1][j-1] # @viz: match
                else:
                    # 3️⃣ Shift: max(solve(i-1, j), solve(i, j-1))
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]) # @viz: skip
                    
        return dp[n][m] # @viz: result