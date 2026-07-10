public class LongestOnes {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            // 1️⃣ Expand
            if (nums[right] == 0) {
                zeroCount++;
            }

            // 2️⃣ Condition: while invalid
            while (zeroCount > k) {
                // 3️⃣ Contract
                if (nums[left] == 0) {
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
}