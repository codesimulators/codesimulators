function totalFruit(fruits) {
    let count = new Map();
    let left = 0;
    let res = 0;

    for (let right = 0; right < fruits.length; right++) {
        // 1️⃣ Expand
        count.set(fruits[right], (count.get(fruits[right]) || 0) + 1);

        // 2️⃣ Condition: while invalid
        while (count.size > 2) {
            // 3️⃣ Contract
            count.set(fruits[left], count.get(fruits[left]) - 1);
            if (count.get(fruits[left]) === 0) {
                count.delete(fruits[left]);
            }
            left++;
        }

        // 4️⃣ Record / Optimize
        if (right - left + 1 > res) {
            res = right - left + 1;
        }
    }

    return res;
}