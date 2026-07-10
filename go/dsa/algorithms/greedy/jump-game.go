func canJump(nums []int) bool { // @viz:mainCall
    goal := len(nums) - 1 // @viz:init
    
    // Iterate backwards from the second-to-last element
    for i := len(nums) - 2; i >= 0; i-- { // @viz:loop
        // If we can reach the current goal from index i
        if i + nums[i] >= goal { // @viz:check
            goal = i // @viz:update
        }
    }
    
    return goal == 0 // @viz:return
}