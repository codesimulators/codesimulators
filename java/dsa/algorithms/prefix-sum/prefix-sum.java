public class Solution {
    public int[] runningSum(int[] nums) {
        int[] prefix = new int[nums.length];
        if (nums.length == 0) {
            return prefix;
        }

        prefix[0] = nums[0];
        for (int i = 1; i < nums.length; i++) {
            prefix[i] = prefix[i - 1] + nums[i];
        }

        return prefix;
    }
}