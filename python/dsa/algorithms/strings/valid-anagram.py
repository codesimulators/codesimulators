def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    count = {}
    for i in range(len(s)):
        char = s[i]
        count[char] = count.get(char, 0) + 1

    for i in range(len(t)):
        char = t[i]
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1

    return True