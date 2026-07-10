function minSubArrayLen(target, nums) {
    let left = 0;
    let currentSum = 0;
    let minLen = Infinity;

    for (let right = 0; right < nums.length; right++) {
        // 1️⃣ Expand
        currentSum += nums[right];

        // 2️⃣ Shrink while condition is met
        while (currentSum >= target) {
            // 3️⃣ Record/Evaluate result
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
            }

            // 4️⃣ Slide window
            currentSum -= nums[left];
            left++;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}