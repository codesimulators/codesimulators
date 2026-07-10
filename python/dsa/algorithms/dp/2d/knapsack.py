class Solution:
    def knapsack(self, weights: List[int], values: List[int], W: int) -> int:
        n = len(weights)
        dp = [[0] * (W + 1) for _ in range(n + 1)] # @viz: init
        
        for i in range(1, n + 1): # @viz: loopI
            for w in range(1, W + 1): # @viz: loopW
                if weights[i - 1] <= w: # @viz: weightCheck
                    take = values[i - 1] + dp[i - 1][w - weights[i - 1]] # @viz: take
                    skip = dp[i - 1][w] # @viz: skip
                    dp[i][w] = max(take, skip) # @viz: compare
                else:
                    dp[i][w] = dp[i - 1][w] # @viz: skipOnly
                    
        return dp[n][W] # @viz: return