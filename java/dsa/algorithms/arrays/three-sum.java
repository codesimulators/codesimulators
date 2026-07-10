class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> results = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            // 🟠 INITIALIZE: Start pointers around the target
            int l = i + 1, r = nums.length - 1;

            // 🟢 LOOP & PROCESS: Converge until match or meet
            while (l < r) {
                // 1️⃣ Process: Evaluate triplet sum
                int currentSum = nums[i] + nums[l] + nums[r];
                
                if (currentSum == 0) {
                    results.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    // Deduplicate pointers
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                }

                // 2️⃣ Decide and Act: Shrink search space
                if (currentSum < 0) {
                    l++; // Too small, move l inward
                } else if (currentSum > 0) {
                    r--; // Too large, move r inward
                } else {
                    l++;
                    r--;
                }
            }
        }
        return results;
    }
}