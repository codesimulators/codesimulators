class Solution {
public:
    int maxArea(vector<int>& heights) {
        // 🟠 INITIALIZE: Start with maximum width
        int left = 0, right = heights.size() - 1;
        int maxAreaResult = 0;

        // 🟢 LOOP & PROCESS: Evaluate area and shrink search space
        while (left < right) {
            // 1️⃣ Process: Calculate area with current boundaries
            int currentWidth = right - left;
            int currentHeight = min(heights[left], heights[right]);
            int currentArea = currentWidth * currentHeight;
            maxAreaResult = max(maxAreaResult, currentArea);

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
};