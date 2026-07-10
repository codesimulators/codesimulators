def moveZeroes(nums):
    last_non_zero_at = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            temp = nums[i]
            nums[i] = nums[last_non_zero_at]
            nums[last_non_zero_at] = temp
            last_non_zero_at += 1
