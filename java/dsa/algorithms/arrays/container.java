class Solution {
    public int maxArea(int[] heights) {
        // 🟠 INITIALIZE: Start with maximum width
        int left = 0, right = heights.length - 1;
        int maxAreaResult = 0;

        // 🟢 LOOP & PROCESS: Evaluate area and shrink search space
        while (left < right) {
            // 1️⃣ Process: Calculate area with current boundaries
            int currentWidth = right - left;
            int currentHeight = Math.min(heights[left], heights[right]);
            int currentArea = currentWidth * currentHeight;
            maxAreaResult = Math.max(maxAreaResult, currentArea);

            // 2️⃣ Decide and Act: Eliminate the shorter wall
            if (heights[left] < heights[right]) {
                left++; // Move left inward to find a taller wall
            } else {
                right--; // Move right inward to find a taller wall
            }
        }
        return maxAreaResult;
    }
}