def longest_substring(s):
    char_map = {}
    left = 0
    max_len = 0

    for right in range(len(s)):
        # 1️⃣ Expand
        char = s[right]

        # 2️⃣ Condition: Check for duplicates
        if char in char_map:
            # 3️⃣ Contract: Jump left pointer
            if char_map[char] + 1 > left:
                left = char_map[char] + 1

        # 4️⃣ Record / Optimize
        char_map[char] = right
        if right - left + 1 > max_len:
            max_len = right - left + 1

    return max_len