class Solution:
    def canJump(self, nums: List[int]) -> bool: # @viz:mainCall
        goal = len(nums) - 1 # @viz:init
        
        # Iterate backwards from the second-to-last element
        for i in range(len(nums) - 2, -1, -1): # @viz:loop
            # If we can reach the current goal from index i
            if i + nums[i] >= goal: # @viz:check
                goal = i # @viz:update
                
        return goal == 0 # @viz:return