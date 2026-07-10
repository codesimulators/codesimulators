func longestPalindrome(s string) string {
  if len(s) < 2 { return s }
  start, maxLen := 0, 1
  
  for i := 0; i < len(s); i++ {
    start, maxLen = expand(s, i, i, start, maxLen)
    start, maxLen = expand(s, i, i+1, start, maxLen)
  }
  return s[start : start+maxLen]
}

func expand(s string, l, r, start, maxLen int) (int, int) {
  for l >= 0 && r < len(s) && s[l] == s[r] {
    if r-l+1 > maxLen {
      maxLen = r-l+1
      start = l
    }
    l-- ; r++
  }
  return start, maxLen
}