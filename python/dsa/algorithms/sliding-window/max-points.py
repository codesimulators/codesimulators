def max_score(card_points: List[int], k: int) -> int:
    n = len(card_points)
    window_size = n - k
    total_sum = 0
    for i in range(n):
        total_sum += card_points[i]

    left = 0
    current_sum = 0
    min_sum = float('inf')

    for right in range(n):
        # 1️⃣ Expand
        current_sum += card_points[right]

        # 2️⃣ When window size reaches k (n-k in this case)
        if right - left + 1 == window_size:
            # 3️⃣ Record / Evaluate
            if current_sum < min_sum:
                min_sum = current_sum

            # 4️⃣ Slide window
            current_sum -= card_points[left]
            left += 1

    if n == k:
        return total_sum
    return total_sum - min_sum