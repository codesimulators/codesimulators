func searchRange(nums []int, target int) []int {
    first := findBound(nums, target, true)
    last := findBound(nums, target, false)
    return []int{first, last}
}

func findBound(nums []int, target int, isFirst bool) int {
    left := 0
    right := len(nums) - 1
    bound := -1
    
    for left <= right {
        mid := left + (right - left) / 2
        if nums[mid] == target {
            bound = mid
            if isFirst {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return bound
}