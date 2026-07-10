function reversePairs(nums) { // @viz: entry
    if (!nums || nums.length < 2) return 0; // @viz: initial_check
    return mergeSortAndCount(nums, 0, nums.length - 1); // @viz: initial_call
}

function mergeSortAndCount(nums, start, end) { // @viz: ms_entry
    if (start >= end) return 0; // @viz: ms_check_base

    const mid = Math.floor((start + end) / 2); // @viz: ms_mid
    let count = mergeSortAndCount(nums, start, mid) + // @viz: ms_left
                mergeSortAndCount(nums, mid + 1, end); // @viz: ms_right

    // 1️⃣ Count Cross-Pairs: L[i] > 2 * R[j]
    let j = mid + 1; // @viz: count_init_j
    for (let i = start; i <= mid; i++) { // @viz: count_loop_i
        while (j <= end && nums[i] > 2 * nums[j]) { // @viz: count_while_j
            j++; // @viz: count_increment_j
        }
        count += (j - (mid + 1)); // @viz: count_add
    }

    // 2️⃣ Standard Merge step
    let left = nums.slice(start, mid + 1); // @viz: merge_init
    let right = nums.slice(mid + 1, end + 1); // @viz: merge_init
    let i = 0, k = start; // @viz: merge_init
    j = 0; // @viz: merge_init

    while (i < left.length && j < right.length) { // @viz: merge_loop
        if (left[i] <= right[j]) { // @viz: merge_compare
            nums[k++] = left[i++]; // @viz: merge_copy_l
        } else {
            nums[k++] = right[j++]; // @viz: merge_copy_r
        }
    }
    while (i < left.length) { // @viz: merge_rem_l_cond
        nums[k++] = left[i++]; // @viz: merge_rem_l_body
    }
    while (j < right.length) { // @viz: merge_rem_r_cond
        nums[k++] = right[j++]; // @viz: merge_rem_r_body
    }

    return count; // @viz: ms_return
}