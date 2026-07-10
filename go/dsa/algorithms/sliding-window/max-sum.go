func findMaxSumSubArray(arr []int, k int) int {
    left := 0
    windowSum := 0
    maxSum := -1 << 31

    for right := 0; right < len(arr); right++ {
        // 1️⃣ Expand
        windowSum += arr[right]

        // 2️⃣ When window size reaches k
        if right - left + 1 == k {
            // 3️⃣ Record / Evaluate
            if windowSum > maxSum {
                maxSum = windowSum
            }

            // 4️⃣ Slide window
            windowSum -= arr[left]
            left++
        }
    }
    return maxSum
}