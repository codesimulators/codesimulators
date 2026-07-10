class Solution:
    def coinChange(self, coins: List[int], amount: int) -> Dict[int, int]: # @viz:mainCall
        coins.sort(reverse=True) # @viz:sort
        result = {} # @viz:init
        for coin in coins: # @viz:loop
            if amount >= coin: # @viz:check
                count = amount // coin # @viz:compute
                result[coin] = count # @viz:update_result
                amount -= count * coin # @viz:update_amount
        return result # @viz:return