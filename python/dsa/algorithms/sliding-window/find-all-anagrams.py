def find_anagrams(s: str, p: str) -> List[int]:
    res = []
    if len(s) < len(p): return res

    p_count = [0] * 26
    s_count = [0] * 26
    for char in p:
        p_count[ord(char) - ord('a')] += 1

    left = 0
    for right in range(len(s)):
        # 1️⃣ Expand
        s_count[ord(s[right]) - ord('a')] += 1

        # 2️⃣ When window size reaches k
        if right - left + 1 == len(p):
            # 3️⃣ Record / Evaluate
            if s_count == p_count:
                res.append(left)

            # 4️⃣ Slide window
            s_count[ord(s[left]) - ord('a')] -= 1
            left += 1

    return res