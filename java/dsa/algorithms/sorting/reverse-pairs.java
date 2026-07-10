class Solution {
    public int reversePairs(int[] nums) { // @viz: entry
        if (nums == null || nums.length < 2) return 0; // @viz: initial_check
        return mergeSortAndCount(nums, 0, nums.length - 1); // @viz: initial_call
    }

    private int mergeSortAndCount(int[] nums, int start, int end) { // @viz: ms_entry
        if (start >= end) return 0; // @viz: ms_check_base

        int mid = start + (end - start) / 2; // @viz: ms_mid
        int count = mergeSortAndCount(nums, start, mid) + // @viz: ms_left
                    mergeSortAndCount(nums, mid + 1, end); // @viz: ms_right

        // 1️⃣ Count Cross-Pairs: nums[i] > 2 * nums[j]
        int j = mid + 1; // @viz: count_init_j
        for (int i = start; i <= mid; i++) { // @viz: count_loop_i
            while (j <= end && (long)nums[i] > 2 * (long)nums[j]) { // @viz: count_while_j
                j++; // @viz: count_increment_j
            }
            count += (j - (mid + 1)); // @viz: count_add
        }

        // 2️⃣ Standard Merge step
        merge(nums, start, mid, end); // @viz: merge_init
        return count; // @viz: ms_return
    }

    private void merge(int[] nums, int start, int mid, int end) {
        int[] sorted = new int[end - start + 1]; // @viz: merge_init
        int i = start, j = mid + 1, k = 0; // @viz: merge_init
        while (i <= mid && j <= end) { // @viz: merge_loop
            if (nums[i] <= nums[j]) { // @viz: merge_compare
                sorted[k++] = nums[i++]; // @viz: merge_copy_l
            } else {
                sorted[k++] = nums[j++]; // @viz: merge_copy_r
            }
        }
        while (i <= mid) { // @viz: merge_rem_l_cond
            sorted[k++] = nums[i++]; // @viz: merge_rem_l_body
        }
        while (j <= end) { // @viz: merge_rem_r_cond
            sorted[k++] = nums[j++]; // @viz: merge_rem_r_body
        }
        System.arraycopy(sorted, 0, nums, start, sorted.length);
    }
}