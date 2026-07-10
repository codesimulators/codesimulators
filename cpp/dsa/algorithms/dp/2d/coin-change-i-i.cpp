class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0); // @viz: init
        dp[0] = 1; // @viz: base
        
        for (int coin : coins) { // @viz: coin_loop
            for (int i = coin; i <= amount; i++) { // @viz: i_check
                dp[i] += dp[i - coin]; // @viz: i_update
            }
        }
        return dp[amount]; // @viz: result
    }
};