function myAtoi(s) {
  s = s.trim();
  if (s.length === 0)
    return 0;
  
  let sign = 1, i = 0, res = 0;
  if (s[i] === '+' || s[i] === '-') {
    sign = s[i] === '+' ? 1 : -1;
    i++;
  }
  while (i < s.length && /\d/.test(s[i])) {
    res = res * 10 + (s[i] - '0');
    if (res * sign >= 2147483647)
      return 2147483647;
    if (res * sign <= -2147483648)
      return -2147483648;
    i++;
  }
  return res * sign;
}