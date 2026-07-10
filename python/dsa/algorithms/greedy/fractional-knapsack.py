def fractional_knapsack(items, capacity): # @viz:init
    # 1️⃣ Sort items by density (value / weight)
    items.sort(key=lambda x: x.val / x.weight, reverse=True) # @viz:sort
    
    total_value = 0.0 # @viz:init
    
    for item in items: # @viz:loop
        if capacity >= item.weight: # @viz:check
            # 2️⃣ Take the entire item
            capacity -= item.weight # @viz:takeAll
            total_value += item.val # @viz:takeAll
        else:
            # 3️⃣ Take a fraction of the item
            fraction = capacity / item.weight # @viz:takeFraction
            total_value += item.val * fraction # @viz:takeFraction
            capacity = 0 # @viz:takeFraction
            break
            
    return total_value # @viz:return