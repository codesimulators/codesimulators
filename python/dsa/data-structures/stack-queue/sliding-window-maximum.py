def max_sliding_window(nums: List[int], k: int) -> List[int]:
    q = deque()
    res = []
    left = 0

    for right in range(len(nums)):
        # 1. Expand
        while q and nums[q[-1]] <= nums[right]:
            q.pop()
        q.append(right)

        # 2. Condition
        if right - left + 1 == k:
            # 3. Record
            res.append(nums[q[0]])

            # 4. Slide
            if q[0] == left:
                q.popleft()
            left += 1

    return res