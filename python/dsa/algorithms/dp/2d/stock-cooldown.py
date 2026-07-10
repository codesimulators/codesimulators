class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [[0, 0, 0] for _ in range(n + 1)] # @viz: init
        
        dp[0][0] = -float('inf') # @viz: base
        dp[0][1] = 0 # @viz: base
        dp[0][2] = 0 # @viz: base
        
        for i in range(1, n + 1): # @viz: loop
            dp[i][0] = max(dp[i-1][0], dp[i-1][2] - prices[i-1]) # @viz: hold_update
            dp[i][1] = dp[i-1][0] + prices[i-1] # @viz: sold_update
            dp[i][2] = max(dp[i-1][2], dp[i-1][1]) # @viz: rest_update
            
        return max(dp[n][1], dp[n][2]) # @viz: result