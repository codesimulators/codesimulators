int subarraysWithKDistinct(vector<int>& nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}

int atMost(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    int left = 0, res = 0;

    for (int right = 0; right < nums.size(); right++) {
        // 1️⃣ Expand
        if (count[nums[right]] == 0) k--;
        count[nums[right]]++;

        // 2️⃣ Condition: while invalid
        while (k < 0) {
            // 3️⃣ Contract
            count[nums[left]]--;
            if (count[nums[left]] == 0) k++;
            left++;
        }

        // 4️⃣ Record / Optimize
        res += right - left + 1;
    }

    return res;
}