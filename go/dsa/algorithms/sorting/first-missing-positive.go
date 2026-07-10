func firstMissingPositive(nums []int) int {
	n := len(nums)
	i := 0
	for i < n {
		targetIdx := nums[i] - 1
		if nums[i] > 0 && nums[i] <= n && nums[targetIdx] != nums[i] {
			nums[i], nums[targetIdx] = nums[targetIdx], nums[i]
		} else {
			i++
		}
	}
	for i := 0; i < n; i++ {
		if nums[i] != i+1 {
			return i + 1
		}
	}
	return n + 1
}