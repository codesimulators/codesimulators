def three_sum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    results = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]: continue

        # 🟠 INITIALIZE: Start pointers around the target
        l, r = i + 1, len(nums) - 1

        # 🟢 LOOP & PROCESS: Converge until match or meet
        while l < r:
            # 1️⃣ Process: Evaluate triplet sum
            current_sum = nums[i] + nums[l] + nums[r]
            
            if current_sum == 0:
                results.append([nums[i], nums[l], nums[r]])
                # Deduplicate pointers
                while l < r and nums[l] == nums[l + 1]: l += 1
                while l < r and nums[r] == nums[r - 1]: r -= 1

            # 2️⃣ Decide and Act: Shrink search space
            if current_sum < 0:
                l += 1  # Too small, move l inward
            elif current_sum > 0:
                r -= 1 # Too large, move r inward
            else:
                l += 1
                r -= 1

    return results