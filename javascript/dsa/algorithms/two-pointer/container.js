function maxArea(heights) {
    // 🟠 INITIALIZE: Start with maximum width
    let left = 0, right = heights.length - 1;
    let maxAreaResult = 0;

    // 🟢 LOOP & PROCESS: Evaluate area and shrink search space
    while (left < right) {
        // 1️⃣ Process: Calculate area with current boundaries
        const currentWidth = right - left;
        const currentHeight = Math.min(heights[left], heights[right]);
        const currentArea = currentWidth * currentHeight;
        maxAreaResult = Math.max(maxAreaResult, currentArea);

        // 2️⃣ Decide and Act: Eliminate the shorter wall
        if (heights[left] < heights[right]) {
            left++; // Move left inward to find a taller wall
        } else if (heights[right] < heights[left]) {
            right--; // Move right inward to find a taller wall
        } else {
            left++;
            right--;
        }
    }
    return maxAreaResult;
}