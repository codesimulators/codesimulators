class Solution {
    public boolean canJump(int[] nums) { // @viz:mainCall
        int goal = nums.length - 1; // @viz:init
        
        // Iterate backwards from the second-to-last element
        for (int i = nums.length - 2; i >= 0; i--) { // @viz:loop
            // If we can reach the current goal from index i
            if (i + nums[i] >= goal) { // @viz:check
                goal = i; // @viz:update
            }
        }
        
        return goal == 0; // @viz:return
    }
}