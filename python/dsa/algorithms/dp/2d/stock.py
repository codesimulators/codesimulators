class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [[0, 0] for _ in range(n + 1)] # @viz: init
        
        dp[0][0] = 0 # @viz: base
        dp[0][1] = -float('inf') # @viz: base
        
        for i in range(1, n + 1): # @viz: loop
            # Option 1: Not Holding
            skip = dp[i-1][0] # @viz: empty_options
            sell = dp[i-1][1] + prices[i-1] # @viz: empty_options
            dp[i][0] = max(skip, sell) # @viz: empty_update
            
            # Option 2: Holding
            stay = dp[i-1][1] # @viz: holding_options
            buy = dp[i-1][0] - prices[i-1] # @viz: holding_options
            dp[i][1] = max(stay, buy) # @viz: holding_update
            
        return dp[n][0] # @viz: result