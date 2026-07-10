def minWindow(s: str, t: str) -> str:
    if not s or not t: return ''
    target = collections.Counter(t)
    required = len(target)
    window = {}
    l, r, count = 0, 0, 0
    min_len = float('inf')
    ans = (0, 0)
    
    while r < len(s):
        char = s[r]
        window[char] = window.get(char, 0) + 1
        if char in target and window[char] == target[char]:
            count += 1
        
        while count == required:
            if (r - l + 1) < min_len:
                min_len = r - l + 1
                ans = (l, r)
            char_l = s[l]
            window[char_l] -= 1
            if char_l in target and window[char_l] < target[char_l]:
                count -= 1
            l += 1
        r += 1
        
    return '' if min_len == float('inf') else s[ans[0] : ans[1] + 1]