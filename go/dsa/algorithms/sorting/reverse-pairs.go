func reversePairs(nums []int) int { // @viz: entry
    if len(nums) < 2 { // @viz: initial_check
        return 0
    }
    return mergeSortAndCount(nums, 0, len(nums)-1) // @viz: initial_call
}

func mergeSortAndCount(nums []int, start, end int) int { // @viz: ms_entry
    if start >= end { // @viz: ms_check_base
        return 0
    }

    mid := (start + end) / 2 // @viz: ms_mid
    count := mergeSortAndCount(nums, start, mid) + // @viz: ms_left
             mergeSortAndCount(nums, mid + 1, end) // @viz: ms_right

    // 1️⃣ Count Cross-Pairs: nums[i] > 2 * nums[j]
    j := mid + 1 // @viz: count_init_j
    for i := start; i <= mid; i++ { // @viz: count_loop_i
        for j <= end && nums[i] > 2*nums[j] { // @viz: count_while_j
            j++ // @viz: count_increment_j
        }
        count += (j - (mid + 1)) // @viz: count_add
    }

    // 2️⃣ Standard Merge step
    merge(nums, start, mid, end) // @viz: merge_init
    return count // @viz: ms_return
}

func merge(nums []int, start, mid, end int) {
    sorted := make([]int, end-start+1) // @viz: merge_init
    i, j, k := start, mid+1, 0 // @viz: merge_init
    for i <= mid && j <= end { // @viz: merge_loop
        if nums[i] <= nums[j] { // @viz: merge_compare
            sorted[k] = nums[i] // @viz: merge_copy_l
            i++ // @viz: merge_copy_l
        } else {
            sorted[k] = nums[j] // @viz: merge_copy_r
            j++ // @viz: merge_copy_r
        }
        k++
    }
    for i <= mid { // @viz: merge_rem_l_cond
        sorted[k] = nums[i] // @viz: merge_rem_l_body
        i++; k++ // @viz: merge_rem_l_body
    }
    for j <= end { // @viz: merge_rem_r_cond
        sorted[k] = nums[j] // @viz: merge_rem_r_body
        j++; k++ // @viz: merge_rem_r_body
    }
    copy(nums[start:], sorted)
}