public class SubarraysK {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int res = 0;

        for (int right = 0; right < nums.length; right++) {
            // 1️⃣ Expand
            if (count.getOrDefault(nums[right], 0) == 0) {
                k--;
            }
            count.put(nums[right], count.getOrDefault(nums[right], 0) + 1);

            // 2️⃣ Condition: while invalid
            while (k < 0) {
                // 3️⃣ Contract
                count.put(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) == 0) {
                    k++;
                }
                left++;
            }

            // 4️⃣ Record / Optimize
            res += right - left + 1;
        }

        return res;
    }
}