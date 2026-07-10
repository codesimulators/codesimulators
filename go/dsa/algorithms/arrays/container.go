func maxArea(heights []int) int {
    // 🟠 INITIALIZE: Start with maximum width
    left, right := 0, len(heights) - 1
    maxAreaResult := 0

    // 🟢 LOOP & PROCESS: Evaluate area and shrink search space
    for left < right {
        // 1️⃣ Process: Calculate area with current boundaries
        currentWidth := right - left
        currentHeight := heights[left]
        if heights[right] < currentHeight {
            currentHeight = heights[right]
        }
        currentArea := currentWidth * currentHeight
        if currentArea > maxAreaResult {
            maxAreaResult = currentArea
        }

        // 2️⃣ Decide and Act: Eliminate the shorter wall
        if heights[left] < heights[right] {
            left++ // Move left inward to find a taller wall
        } else {
            right-- // Move right inward to find a taller wall
        }
    }
    return maxAreaResult
}