func maxScore(cardPoints []int, k int) int {
    n := len(cardPoints)
    windowSize := n - k
    totalSum := 0
    for i := 0; i < n; i++ {
        totalSum += cardPoints[i]
    }

    left := 0
    currentSum := 0
    minSum := 1 << 31 - 1 // Max int value

    for right := 0; right < n; right++ {
        // 1️⃣ Expand
        currentSum += cardPoints[right]

        // 2️⃣ When window size reaches k (n-k in this case)
        if right - left + 1 == windowSize {
            // 3️⃣ Record / Evaluate
            if currentSum < minSum {
                minSum = currentSum
            }

            // 4️⃣ Slide window
            currentSum -= cardPoints[left]
            left++
        }
    }
    if n == k { return totalSum }
    return totalSum - minSum
}