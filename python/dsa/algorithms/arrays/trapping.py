def trap(heights: List[int]) -> int:
    # 🟠 INITIALIZE: Pointers at ends, track max boundaries
    left, right = 0, len(heights) - 1
    left_max, right_max = 0, 0
    total_water = 0

    # 🟢 LOOP & PROCESS: Converge while calculating trapped water
    while left < right:
        # 1️⃣ Process: Update boundaries based on current heights
        left_max = max(left_max, heights[left])
        right_max = max(right_max, heights[right])

        # 2️⃣ Decide and Act: Move the pointer with the lower boundary
        if heights[left] < heights[right]:
            total_water += left_max - heights[left]
            left += 1
        else:
            total_water += right_max - heights[right]
            right -= 1

    return total_water