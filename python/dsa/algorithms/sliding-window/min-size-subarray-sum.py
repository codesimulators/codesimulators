def min_sub_array_len(target: int, nums: List[int]) -> int:
    left = 0
    total = 0
    min_len = float('inf')

    for right in range(len(nums)):
        # 1️⃣ Expand
        total += nums[right]

        # 2️⃣ Shrink
        while total >= target:
            # 3️⃣ Record
            if right - left + 1 < min_len:
                min_len = right - left + 1

            # 4️⃣ Slide
            total -= nums[left]
            left += 1

    return min_len if min_len != float('inf') else 0