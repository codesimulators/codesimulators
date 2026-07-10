func runningSum(nums []int) []int {
    prefix := make([]int, len(nums))
    prefix[0] = nums[0]
    for i := 1; i < len(nums); i++ {
        prefix[i] = prefix[i-1] + nums[i]
    }
    return prefix
}