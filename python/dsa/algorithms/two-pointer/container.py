def max_area(heights: List[int]) -> int:
    # 🟠 INITIALIZE: Start with maximum width
    left, right = 0, len(heights) - 1
    max_area_result = 0

    # 🟢 LOOP & PROCESS: Evaluate area and shrink search space
    while left < right:
        # 1️⃣ Process: Calculate area with current boundaries
        current_width = right - left
        current_height = min(heights[left], heights[right])
        current_area = current_width * current_height
        max_area_result = max(max_area_result, current_area)

        # 2️⃣ Decide and Act: Eliminate the shorter wall
        if heights[left] < heights[right]:
            left += 1  # Move left inward to find a taller wall
        elif heights[right] < heights[left]:
            right -= 1 # Move right inward to find a taller wall
        else:
            left += 1
            right -= 1

    return max_area_result