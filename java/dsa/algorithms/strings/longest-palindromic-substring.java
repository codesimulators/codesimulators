public String longestPalindrome(String s) {
  if (s == null || s.length() < 2) return s;
  int start = 0, maxLen = 1;
  
  for (int i = 0; i < s.length(); i++) {
    int[] res1 = expand(s, i, i, start, maxLen);
    int[] res2 = expand(s, i, i + 1, res1[0], res1[1]);
    start = res2[0]; maxLen = res2[1];
  }
  return s.substring(start, start + maxLen);
}

private int[] expand(String s, int l, int r, int start, int maxLen) {
  while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
    if (r - l + 1 > maxLen) {
      maxLen = r - l + 1;
      start = l;
    }
    l--; r++;
  }
  return new int[]{start, maxLen};
}