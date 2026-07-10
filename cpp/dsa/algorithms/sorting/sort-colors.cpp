class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            // 1️⃣ Inspect: What color is at mid?
            if (nums[mid] == 0) {
                // 2️⃣ Red → swap to front
                swap(nums[low], nums[mid]);
                low++; mid++;
            } else if (nums[mid] == 1) {
                // 3️⃣ White → already in place
                mid++;
            } else {
                // 4️⃣ Blue → swap to back
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};