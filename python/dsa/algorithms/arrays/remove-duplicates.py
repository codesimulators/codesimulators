def removeDuplicates(nums):
    if not nums: return 0
    k = 0  # index of the current last unique element
    for i in range(1, len(nums)):
        if nums[i] != nums[k]: # check against last unique value
            k += 1 # move to next free unique slot
            nums[k] = nums[i] # store new unique value
    return k + 1 # return total count of unique elements