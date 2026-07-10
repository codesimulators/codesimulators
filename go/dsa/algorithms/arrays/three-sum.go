func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    results := [][]int{}

    for i := 0; i < len(nums)-2; i++ {
        if i > 0 && nums[i] == nums[i-1] { continue }

        // 🟠 INITIALIZE: Start pointers around the target
        l, r := i+1, len(nums)-1

        // 🟢 LOOP & PROCESS: Converge until match or meet
        for l < r {
            // 1️⃣ Process: Evaluate triplet sum
            currentSum := nums[i] + nums[l] + nums[r]
            
            if currentSum == 0 {
                results = append(results, []int{nums[i], nums[l], nums[r]})
                // Deduplicate pointers
                for l < r && nums[l] == nums[l+1] { l++ }
                for l < r && nums[r] == nums[r-1] { r-- }
            }

            // 2️⃣ Decide and Act: Shrink search space
            if currentSum < 0 {
                l++ // Too small, move l inward
            } else if currentSum > 0 {
                r-- // Too large, move r inward
            } else {
                l++
                r--
            }
        }
    }
    return results
}