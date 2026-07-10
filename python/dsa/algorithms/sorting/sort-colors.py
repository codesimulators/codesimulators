def sortColors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        # 1️⃣ Inspect: What color is at mid?
        if nums[mid] == 0:
            # 2️⃣ Red → swap to front
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            # 3️⃣ White → already in place
            mid += 1
        else:
            # 4️⃣ Blue → swap to back
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums