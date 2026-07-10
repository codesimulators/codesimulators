class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i, j = 0, 0
        while i < len(s) and j < len(t):
            # 1️⃣ Compare: Do characters match?
            if s[i] == t[j]:
                # 2️⃣ Match! Consume from subsequence
                i += 1
            # 3️⃣ Always advance through main string
            j += 1
        return i == len(s)