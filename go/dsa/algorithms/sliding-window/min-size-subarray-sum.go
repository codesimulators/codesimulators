func minSubArrayLen(target int, nums []int) int {
    left := 0
    currentSum := 0
    minLen := 1 << 31 - 1

    for right := 0; right < len(nums); right++ {
        // 1️⃣ Expand
        currentSum += nums[right]

        // 2️⃣ Shrink
        for currentSum >= target {
            // 3️⃣ Record
            if right - left + 1 < minLen {
                minLen = right - left + 1
            }

            // 4️⃣ Slide
            currentSum -= nums[left]
            left++
        }
    }

    if minLen == 1 << 31 - 1 { return 0 }
    return minLen
}