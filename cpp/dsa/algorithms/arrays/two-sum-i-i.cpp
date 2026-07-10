class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // 🟠 INITIALIZE: Start pointers at opposite ends
        int left = 0, right = numbers.size() - 1;

        // 🟢 LOOP & PROCESS: Converge until match or pointers meet
        while (left < right) {
            // 1️⃣ Process: Evaluate the current state
            int currentSum = numbers[left] + numbers[right];
            
            if (currentSum == target) {
                return {left + 1, right + 1};
            }

            // 2️⃣ Decide and Act: Shrink search space
            if (currentSum < target) {
                left++; // Sum too small, move left inward
            } else {
                right--; // Sum too large, move right inward
            }
        }
        return {};
    }
};