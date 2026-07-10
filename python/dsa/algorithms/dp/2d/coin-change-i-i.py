class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1) # @viz: init
        dp[0] = 1 # @viz: base
        
        for coin in coins: # @viz: coin_loop
            for i in range(coin, amount + 1): # @viz: i_check
                dp[i] += dp[i - coin] # @viz: i_update
                
        return dp[amount] # @viz: result