class Solution {
public:
    int reversePairs(vector<int>& nums) { // @viz: entry
        if (nums.empty()) return 0; // @viz: initial_check
        return mergeSortAndCount(nums, 0, nums.size() - 1); // @viz: initial_call
    }

private:
    int mergeSortAndCount(vector<int>& nums, int start, int end) { // @viz: ms_entry
        if (start >= end) return 0; // @viz: ms_check_base

        int mid = start + (end - start) / 2; // @viz: ms_mid
        int count = mergeSortAndCount(nums, start, mid) + // @viz: ms_left
                    mergeSortAndCount(nums, mid + 1, end); // @viz: ms_right

        // 1️⃣ Count Cross-Pairs: nums[i] > 2 * nums[j]
        int j = mid + 1; // @viz: count_init_j
        for (int i = start; i <= mid; i++) { // @viz: count_loop_i
            while (j <= end && (long long)nums[i] > 2LL * nums[j]) { // @viz: count_while_j
                j++; // @viz: count_increment_j
            }
            count += (j - (mid + 1)); // @viz: count_add
        }

        // 2️⃣ Standard Merge step
        inplace_merge(nums.begin() + start, nums.begin() + mid + 1, nums.begin() + end + 1); // @viz: merge_init
        return count; // @viz: ms_return
    }
};