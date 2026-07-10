int totalFruit(vector<int>& fruits) {
    unordered_map<int, int> count;
    int left = 0, res = 0;

    for (int right = 0; right < fruits.size(); right++) {
        // 1️⃣ Expand
        count[fruits[right]]++;

        // 2️⃣ Condition: while invalid
        while (count.size() > 2) {
            // 3️⃣ Contract
            count[fruits[left]]--;
            if (count[fruits[left]] == 0) {
                count.erase(fruits[left]);
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