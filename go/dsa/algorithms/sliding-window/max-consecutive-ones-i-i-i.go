func longestOnes(nums []int, k int) int {
    left := 0
    zeroCount := 0
    maxLen := 0

    for right := 0; right < len(nums); right++ {
        // 1️⃣ Expand
        if nums[right] == 0 {
            zeroCount++
        }

        // 2️⃣ Condition: while invalid
        for zeroCount > k {
            // 3️⃣ Contract
            if nums[left] == 0 {
                zeroCount--
            }
            left++
        }

        // 4️⃣ Record / Optimize
        if right - left + 1 > maxLen {
            maxLen = right - left + 1
        }
    }

    return maxLen
}