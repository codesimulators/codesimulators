class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> results;

        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            // 🟠 INITIALIZE: Start pointers around the target
            int l = i + 1, r = nums.size() - 1;

            // 🟢 LOOP & PROCESS: Converge until match or meet
            while (l < r) {
                // 1️⃣ Process: Evaluate triplet sum
                int currentSum = nums[i] + nums[l] + nums[r];
                
                if (currentSum == 0) {
                    results.push_back({nums[i], nums[l], nums[r]});
                    // Deduplicate pointers
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                }

                // 2️⃣ Decide and Act: Shrink search space
                if (currentSum < 0) {
                    l++; // Too small, move l inward
                } else if (currentSum > 0) {
                    r--; // Too large, move r inward
                } else {
                    l++;
                    r--;
                }
            }
        }
        return results;
    }
};