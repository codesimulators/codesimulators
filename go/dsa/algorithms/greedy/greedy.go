func coinChange(coins []int, amount int) map[int]int { // @viz:mainCall
    sort.Sort(sort.Reverse(sort.IntSlice(coins))) // @viz:sort
    result := make(map[int]int) // @viz:init
    for _, coin := range coins { // @viz:loop
        if amount >= coin { // @viz:check
            count := amount / coin // @viz:compute
            result[coin] = count // @viz:update_result
            amount -= count * coin // @viz:update_amount
        }
    }
    return result // @viz:return
}