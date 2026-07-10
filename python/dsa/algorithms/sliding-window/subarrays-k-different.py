def subarrays_with_k_distinct(nums: List[int], k: int) -> int:
    return at_most(nums, k) - at_most(nums, k - 1)

def at_most(nums, k):
    count = Counter()
    left = 0
    res = 0

    for right, n in enumerate(nums):
        # 1️⃣ Expand
        if count[n] == 0:
            k -= 1
        count[n] += 1

        # 2️⃣ Condition: while invalid
        while k < 0:
            # 3️⃣ Contract
            count[nums[left]] -= 1
            if count[nums[left]] == 0:
                k += 1
            left += 1

        # 4️⃣ Record / Optimize
        res += right - left + 1

    return res