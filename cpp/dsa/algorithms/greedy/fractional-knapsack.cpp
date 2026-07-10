class Solution {
public:
    double fractionalKnapsack(vector<Item>& items, int capacity) { // @viz:init
        // 1️⃣ Sort items by density (value / weight)
        sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
            return (double)a.val/a.weight > (double)b.val/b.weight;
        }); // @viz:sort
        
        double totalValue = 0; // @viz:init
        
        for (auto& item : items) { // @viz:loop
            if (capacity >= item.weight) { // @viz:check
                // 2️⃣ Take the entire item
                capacity -= item.weight; // @viz:takeAll
                totalValue += item.val; // @viz:takeAll
            } else {
                // 3️⃣ Take a fraction of the item
                double fraction = (double)capacity / item.weight; // @viz:takeFraction
                totalValue += item.val * fraction; // @viz:takeFraction
                capacity = 0; // @viz:takeFraction
                break;
            }
        }
        return totalValue; // @viz:return
    }
};