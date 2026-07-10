function longestPalindrome(s) {
  if (s.length < 2) return s;
  let start = 0, maxLength = 1;
  
  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd
    expand(i, i + 1); // Even
  }
  
  return s.substring(start, start + maxLength);
  
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      const len = r - l + 1;
      if (len > maxLength) {
        maxLength = len;
        start = l;
      }
      l--;
      r++;
    }
  }
}