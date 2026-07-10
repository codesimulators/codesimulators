def reverseWords(s: str) -> str:
    words = s.split()
    res = []
    for i in range(len(words) - 1, -1, -1):
        res.append(words[i])
    return ' '.join(res)