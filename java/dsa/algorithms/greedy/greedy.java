class Solution {
    public Map<Integer, Integer> coinChange(int[] coins, int amount) { // @viz:mainCall
        Arrays.sort(coins); // @viz:sort
        Map<Integer, Integer> result = new HashMap<>(); // @viz:init
        for (int i = coins.length - 1; i >= 0; i--) { // @viz:loop
            int coin = coins[i]; // @viz:loop
            if (amount >= coin) { // @viz:check
                int count = amount / coin; // @viz:compute
                result.put(coin, count); // @viz:update_result
                amount -= count * coin; // @viz:update_amount
            }
        }
        return result; // @viz:return
    }
}