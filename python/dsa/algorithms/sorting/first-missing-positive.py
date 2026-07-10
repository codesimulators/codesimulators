def firstMissingPositive(nums):
    n = len(nums)
    i = 0
    while i < n:
        target_idx = nums[i] - 1
        if 0 < nums[i] <= n and nums[target_idx] != nums[i]:
            nums[i], nums[target_idx] = nums[target_idx], nums[i]
        else:
            i += 1
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1