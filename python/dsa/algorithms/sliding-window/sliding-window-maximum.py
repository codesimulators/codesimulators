def max_sliding_window(nums: List[int], k: int) -> List[int]:
    q = deque()
    res = []
    left = 0

    for right in range(len(nums)):
        # 1️⃣ Expand: Maintain monotonic property
        while q and nums[q[-1]] <= nums[right]:
            q.pop()
        q.append(right);

        // 2️⃣ When window size reaches k
        if right - left + 1 == k:
            // 3️⃣ Record / Evaluate
            res.append(nums[q[0]])

            // 4️⃣ Slide window
            if q[0] == left:
                q.popleft()
            left += 1

    return res