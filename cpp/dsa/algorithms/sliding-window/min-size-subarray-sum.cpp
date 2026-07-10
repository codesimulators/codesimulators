int minSubArrayLen(int target, vector<int>& nums) {
    int left = 0;
    int currentSum = 0;
    int minLen = numeric_limits<int>::max();

    for (int right = 0; right < nums.size(); right++) {
        // 1️⃣ Expand
        currentSum += nums[right];

        // 2️⃣ Shrink
        while (currentSum >= target) {
            // 3️⃣ Record
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
            }

            // 4️⃣ Slide
            currentSum -= nums[left];
            left++;
        }
    }
    return minLen == numeric_limits<int>::max() ? 0 : minLen;
}