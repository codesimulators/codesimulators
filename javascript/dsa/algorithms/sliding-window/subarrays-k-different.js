function subarraysWithKDistinct(nums, k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums, k) {
    let count = new Map();
    let left = 0;
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        // 1️⃣ Expand
        if (!count.get(nums[right])) {
            k--;
        }
        count.set(nums[right], (count.get(nums[right]) || 0) + 1);

        // 2️⃣ Condition: while invalid (too many distinct)
        while (k < 0) {
            // 3️⃣ Contract
            count.set(nums[left], count.get(nums[left]) - 1);
            if (count.get(nums[left]) === 0) {
                k++;
            }
            left++;
        }

        // 4️⃣ Record / Optimize
        res += right - left + 1;
    }

    return res;
}