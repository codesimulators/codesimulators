/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {object}
 */
var coinChange = function(coins, amount) { // @viz:mainCall
    coins.sort((a, b) => b - a); // @viz:sort
    let result = {}; // @viz:init
    for (let coin of coins) { // @viz:loop
        if (amount >= coin) { // @viz:check
            let count = Math.floor(amount / coin); // @viz:compute
            result[coin] = count; // @viz:update_result
            amount -= count * coin; // @viz:update_amount
        }
    }
    return result; // @viz:return
};