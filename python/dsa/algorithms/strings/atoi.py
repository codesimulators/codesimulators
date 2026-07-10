def myAtoi(s: str) -> int:
    s = s.strip()
    if not s:
        return 0
    sign, i, res = 1, 0, 0
    if s[i] in '+-':
        sign = 1 if s[i] == '+' else -1
        i += 1
    while i < len(s) and s[i].isdigit():
        res = res * 10 + int(s[i])
        if res * sign >= 2**31 - 1:
            return 2**31 - 1
        if res * sign <= -2**31:
            return -2**31
        i += 1
    return res * sign