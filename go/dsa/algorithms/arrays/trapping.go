func trap(heights []int) int {
    // 🟠 INITIALIZE: Pointers at ends, track max boundaries
    left, right := 0, len(heights)-1
    leftMax, rightMax := 0, 0
    totalWater := 0

    // 🟢 LOOP & PROCESS: Converge while calculating trapped water
    for left < right {
        // 1️⃣ Process: Update boundaries based on current heights
        if heights[left] > leftMax { leftMax = heights[left] }
        if heights[right] > rightMax { rightMax = heights[right] }

        // 2️⃣ Decide and Act: Move the pointer with the lower boundary
        if heights[left] < heights[right] {
            totalWater += leftMax - heights[left]
            left++
        } else {
            totalWater += rightMax - heights[right]
            right--
        }
    }
    return totalWater
}