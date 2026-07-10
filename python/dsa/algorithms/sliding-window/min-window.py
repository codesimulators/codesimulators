def min_window(s: str, t: str) -> str:
    if len(s) < len(t): return ""
    
    target_freq = Counter(t)
    window_freq = Counter()
    
    left = match_count = best_start = 0
    min_length = float('inf')
    required_matches = len(target_freq)

    for right, char in enumerate(s):
        # 1️⃣ Expand
        if char in target_freq:
            window_freq[char] += 1
            if window_freq[char] == target_freq[char]:
                match_count += 1

        # 2️⃣ Condition: while valid
        while match_count == required_matches:
            # 4️⃣ Record / Optimize
            if (right - left + 1) < min_length:
                min_length = right - left + 1
                best_start = left

            # 3️⃣ Contract
            left_char = s[left]
            if left_char in target_freq:
                if window_freq[left_char] == target_freq[left_char]:
                    match_count -= 1
                window_freq[left_char] -= 1

            left += 1

    return "" if min_length == float("inf") else s[best_start:best_start + min_length]