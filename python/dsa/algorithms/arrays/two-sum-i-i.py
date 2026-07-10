def two_sum(numbers: List[int], target: int) -> List[int]:
    # 🟠 INITIALIZE: Start pointers at opposite ends
    left, right = 0, len(numbers) - 1

    # 🟢 LOOP & PROCESS: Converge until match or pointers meet
    while left < right:
        # 1️⃣ Process: Evaluate the current state
        current_sum = numbers[left] + numbers[right]
        
        if current_sum == target:
            return [left + 1, right + 1]

        # 2️⃣ Decide and Act: Shrink search space
        if current_sum < target:
            left += 1  # Sum too small, move left inward
        else:
            right -= 1 # Sum too large, move right inward

    return []