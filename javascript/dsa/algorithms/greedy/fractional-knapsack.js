function fractionalKnapsack(items, capacity) { // @viz:init
    // 1️⃣ Sort items by density (value / weight)
    items.sort((a, b) => (b.val / b.weight) - (a.val / a.weight)); // @viz:sort
    
    let totalValue = 0; // @viz:init
    
    for (let i = 0; i < items.length; i++) { // @viz:loop
        const item = items[i];
        
        if (capacity >= item.weight) { // @viz:check
            // 2️⃣ Take the entire item
            capacity -= item.weight; // @viz:takeAll
            totalValue += item.val; // @viz:takeAll
        } else {
            // 3️⃣ Take a fraction of the item
            const fraction = capacity / item.weight; // @viz:takeFraction
            totalValue += item.val * fraction; // @viz:takeFraction
            capacity = 0; // @viz:takeFraction
            break;
        }
    }
    
    return totalValue; // @viz:return
}