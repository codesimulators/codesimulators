class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        n = len(coins)
        # 1️⃣ Initialize DP table with ∞
        dp = [[float('inf')] * (amount + 1) for _ in range(n + 1)] # @viz: init
        
        # 2️⃣ Base case: 0 coins for amount 0
        for i in range(n + 1): dp[i][0] = 0 # @viz: base
        
        for i in range(1, n + 1): # @viz: loopI
            for j in range(1, amount + 1): # @viz: loopJ
                if coins[i-1] <= j: # @viz: ifTake
                    # 3️⃣ Take = 1 + solve(i, j - coin)
                    # 4️⃣ Skip = solve(i-1, j)
                    dp[i][j] = min(dp[i-1][j], 1 + dp[i][j - coins[i-1]]) # @viz: take
                else:
                    dp[i][j] = dp[i-1][j] # @viz: skip
                    
        return dp[n][amount] if dp[n][amount] != float('inf') else -1 # @viz: result