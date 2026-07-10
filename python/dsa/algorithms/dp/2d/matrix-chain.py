class Solution:
    def matrixChainOrder(self, dims: List[int]) -> int:
        n = len(dims) - 1
        dp = [[0] * (n + 1) for _ in range(n + 1)] # @viz: init
        
        for length in range(2, n + 1): # @viz: loopLen
            for i in range(1, n - length + 2): # @viz: loopI
                j = i + length - 1
                dp[i][j] = float('inf') # @viz: loopJ
                
                for k in range(i, j): # @viz: loopK
                    cost = dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j] # @viz: compute
                    if cost < dp[i][j]: # @viz: check
                        dp[i][j] = cost # @viz: update
                        
        return dp[1][n] # @viz: result