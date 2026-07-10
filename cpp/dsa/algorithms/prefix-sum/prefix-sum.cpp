class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        if (nums.empty()) {
            return {};
        }

        vector<int> prefix(nums.size());
        prefix[0] = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            prefix[i] = prefix[i - 1] + nums[i];
        }

        return prefix;
    }
};