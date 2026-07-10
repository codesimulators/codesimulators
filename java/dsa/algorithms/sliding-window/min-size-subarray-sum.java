public class MinSizeSubarray {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            // 1️⃣ Expand
            sum += nums[right];

            // 2️⃣ Shrink
            while (sum >= target) {
                // 3️⃣ Record
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                }

                // 4️⃣ Slide
                sum -= nums[left];
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}