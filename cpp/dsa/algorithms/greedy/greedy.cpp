class Solution {
public:
    map<int, int> coinChange(vector<int>& coins, int amount) { // @viz:mainCall
        sort(coins.rbegin(), coins.rend()); // @viz:sort
        map<int, int> result; // @viz:init
        for (int coin : coins) { // @viz:loop
            if (amount >= coin) { // @viz:check
                int count = amount / coin; // @viz:compute
                result[coin] = count; // @viz:update_result
                amount -= count * coin; // @viz:update_amount
            }
        }
        return result; // @viz:return
    }
};