func subarraysWithKDistinct(nums []int, k int) int {
    return atMost(nums, k) - atMost(nums, k-1)
}

func atMost(nums []int, k int) int {
    count := make(map[int]int)
    left, res := 0, 0

    for right, n := range nums {
        // 1️⃣ Expand
        if count[n] == 0 {
            k--
        }
        count[n]++

        // 2️⃣ Condition: while invalid
        for k < 0 {
            // 3️⃣ Contract
            count[nums[left]]--
            if count[nums[left]] == 0 {
                k++
            }
            left++
        }

        // 4️⃣ Record / Optimize
        res += right - left + 1
    }

    return res
}