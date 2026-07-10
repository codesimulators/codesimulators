class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        if not envelopes: return 0 # @viz: init
        
        # 1️⃣ Sort: Width asc, Height desc
        envelopes.sort(key=lambda x: (x[0], -x[1])) # @viz: sort
        
        # 2️⃣ DP LIS on Heights
        n = len(envelopes)
        dp = [1] * n # @viz: lis_init
        
        for i in range(n): # @viz: lis_i
            for j in range(i): # @viz: lis_j
                if envelopes[j][1] < envelopes[i][1]: # @viz: lis_j
                    dp[i] = max(dp[i], dp[j] + 1) # @viz: lis_update
                    
        return max(dp) # @viz: result