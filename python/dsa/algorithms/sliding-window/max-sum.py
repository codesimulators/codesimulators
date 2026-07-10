def find_max_sum_subarray(arr, k):
    left = 0
    window_sum = 0
    max_sum = float('-inf')

    for right in range(len(arr)):
        # 1️⃣ Expand
        window_sum += arr[right]

        # 2️⃣ When window size reaches k
        if right - left + 1 == k:
            # 3️⃣ Record / Evaluate
            max_sum = max(max_sum, window_sum)

            # 4️⃣ Slide window
            window_sum -= arr[left]
            left += 1

    return max_sum