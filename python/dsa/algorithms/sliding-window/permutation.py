def check_inclusion(target: str, search_string: str) -> bool:
    if len(target) > len(search_string): return False

    target_freq = [0] * 26
    window_freq = [0] * 26
    for i in range(len(target)):
        target_freq[ord(target[i]) - ord('a')] += 1

    def check_match(c1, c2):
        for j in range(26):
            if c1[j] != c2[j]: return False
        return True

    left = 0
    for right in range(len(search_string)):
        # 1️⃣ Expand
        window_freq[ord(search_string[right]) - ord('a')] += 1

        # 2️⃣ When window size reaches k
        if right - left + 1 == len(target):
            # 3️⃣ Record / Evaluate
            if check_match(target_freq, window_freq):
                return True

            # 4️⃣ Slide window
            window_freq[ord(search_string[left]) - ord('a')] -= 1
            left += 1

    return False