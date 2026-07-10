class Solution {
    public int trap(int[] heights) {
        // 🟠 INITIALIZE: Pointers at ends, track max boundaries
        int left = 0, right = heights.length - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;

        // 🟢 LOOP & PROCESS: Converge while calculating trapped water
        while (left < right) {
            // 1️⃣ Process: Update boundaries based on current heights
            leftMax = Math.max(leftMax, heights[left]);
            rightMax = Math.max(rightMax, heights[right]);

            // 2️⃣ Decide and Act: Move the pointer with the lower boundary
            if (heights[left] < heights[right]) {
                totalWater += leftMax - heights[left];
                left++;
            } else {
                totalWater += rightMax - heights[right];
                right--;
            }
        }
        return totalWater;
    }
}