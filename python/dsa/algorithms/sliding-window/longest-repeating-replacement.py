def character_replacement(s: str, k: int) -> int:
    frequency_map = {}
    max_frequency = 0
    left = 0
    max_length = 0

    for right, char in enumerate(s):
        # 1️⃣ Expand
        frequency_map[char] = frequency_map.get(char, 0) + 1
        if frequency_map[char] > max_frequency:
            max_frequency = frequency_map[char]

        # 2️⃣ Condition: while invalid
        while (right - left + 1) - max_frequency > k:
            # 3️⃣ Contract
            frequency_map[s[left]] -= 1
            left += 1

        # 4️⃣ Record / Optimize
        if right - left + 1 > max_length:
            max_length = right - left + 1

    return max_length