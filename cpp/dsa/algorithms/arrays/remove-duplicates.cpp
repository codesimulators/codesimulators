class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int k = 0; // index of the current last unique element
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[k]) { // check against last unique value
                k++; // move to next free unique slot
                nums[k] = nums[i]; // store new unique value
            }
        }
        return k + 1; // return total count of unique elements
    }
};