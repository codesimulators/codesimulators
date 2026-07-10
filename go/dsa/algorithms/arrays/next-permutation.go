func nextPermutation(nums []int) {
    n := len(nums)
    // 1. Find pivot
    pivot := n - 2
    for pivot >= 0 && nums[pivot] >= nums[pivot+1] {
        pivot--
    }
    // 2. Find successor and swap
    if pivot >= 0 {
        successor := n - 1
        for nums[successor] <= nums[pivot] {
            successor--
        }
        nums[pivot], nums[successor] = nums[successor], nums[pivot]
    }
    // 3. Reverse suffix
    left, right := pivot+1, n-1
    for left < right {
        nums[left], nums[right] = nums[right], nums[left]
        left++; right--
    }
}