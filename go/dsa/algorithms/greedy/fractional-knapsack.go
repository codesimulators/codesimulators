func fractionalKnapsack(items []Item, capacity int) float64 { // @viz:init
    // 1️⃣ Sort items by density (value / weight)
    sort.Slice(items, func(i, j int) bool { // @viz:sort
        return float64(items[i].val)/float64(items[i].weight) > float64(items[j].val)/float64(items[j].weight)
    })
    
    totalValue := 0.0 // @viz:init
    
    for _, item := range items { // @viz:loop
        if capacity >= item.weight { // @viz:check
            // 2️⃣ Take the entire item
            capacity -= item.weight // @viz:takeAll
            totalValue += float64(item.val) // @viz:takeAll
        } else {
            // 3️⃣ Take a fraction of the item
            fraction := float64(capacity) / float64(item.weight) // @viz:takeFraction
            totalValue += float64(item.val) * fraction // @viz:takeFraction
            capacity = 0 // @viz:takeFraction
            break
        }
    }
    return totalValue // @viz:return
}