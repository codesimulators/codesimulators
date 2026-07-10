function longestOnes(nums, k) {
    let left = 0;
    let zeroCount = 0;
    let maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        // 1️⃣ Expand
        if (nums[right] === 0) {
            zeroCount++;
        }

        // 2️⃣ Condition: while invalid (too many zeros)
        while (zeroCount > k) {
            // 3️⃣ Contract
            if (nums[left] === 0) {
                zeroCount--;
            }
            left++;
        }

        // 4️⃣ Record / Optimize
        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
        }
    }

    return maxLen;
}