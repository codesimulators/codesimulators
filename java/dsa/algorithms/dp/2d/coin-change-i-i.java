class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1]; // @viz: init
        dp[0] = 1; // @viz: base
        
        for (int coin : coins) { // @viz: coin_loop
            for (int i = coin; i <= amount; i++) { // @viz: i_check
                dp[i] += dp[i - coin]; // @viz: i_update
            }
        }
        return dp[amount]; // @viz: result
    }
}