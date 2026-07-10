def longestPalindrome(s: str) -> str:
  if len(s) < 2: return s
  res = [0, 1] # start, maxLen
  
  for i in range(len(s)):
    expand(s, i, i, res)
    expand(s, i, i + 1, res)
    
  return s[res[0] : res[0] + res[1]]

def expand(s, l, r, res):
  while l >= 0 and r < len(s) and s[l] == s[r]:
    if (r - l + 1) > res[1]:
      res[1] = r - l + 1
      res[0] = l
    l -= 1
    r += 1