def reversePairs(nums): # @viz: entry
    if not nums or len(nums) < 2: # @viz: initial_check
        return 0
    return mergeSortAndCount(nums, 0, len(nums) - 1) # @viz: initial_call

def mergeSortAndCount(nums, start, end): # @viz: ms_entry
    if start >= end: # @viz: ms_check_base
        return 0
    
    mid = (start + end) // 2 # @viz: ms_mid
    count = (mergeSortAndCount(nums, start, mid) + # @viz: ms_left
             mergeSortAndCount(nums, mid + 1, end)) # @viz: ms_right

    # 1️⃣ Count Cross-Pairs: nums[i] > 2 * nums[j]
    j = mid + 1 # @viz: count_init_j
    for i in range(start, mid + 1): # @viz: count_loop_i
        while j <= end and nums[i] > 2 * nums[j]: # @viz: count_while_j
            j += 1 # @viz: count_increment_j
        count += (j - (mid + 1)) # @viz: count_add
    
    # 2️⃣ Standard Merge step
    nums[start:end+1] = sorted(nums[start:end+1]) # @viz: merge_init
    return count # @viz: ms_return