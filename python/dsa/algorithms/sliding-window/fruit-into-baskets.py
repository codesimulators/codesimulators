def total_fruit(fruits: List[int]) -> int:
    count = collections.Counter()
    left = 0
    res = 0

    for right, f in enumerate(fruits):
        # 1️⃣ Expand
        count[f] += 1

        # 2️⃣ Condition: while invalid
        while len(count) > 2:
            # 3️⃣ Contract
            count[fruits[left]] -= 1
            if count[fruits[left]] == 0:
                del count[fruits[left]]
            left += 1

        # 4️⃣ Record / Optimize
        if right - left + 1 > res:
            res = right - left + 1

    return res