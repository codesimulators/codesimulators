def longest_ones(nums: List[int], k: int) -> int:
    left = 0
    zero_count = 0
    max_len = 0

    for right in range(len(nums)):
        # 1️⃣ Expand
        if nums[right] == 0:
            zero_count += 1

        # 2️⃣ Condition: while invalid
        while zero_count > k:
            # 3️⃣ Contract
            if nums[left] == 0:
                zero_count -= 1
            left += 1

        # 4️⃣ Record / Optimize
        if right - left + 1 > max_len:
            max_len = right - left + 1

    return max_len