function minWindow(s, t) {
  if (s.length < t.length) return '';
  const targetFreq = {};
  for (const char of t) targetFreq[char] = (targetFreq[char] || 0) + 1;
  
  const windowFreq = {};
  let l = 0, r = 0, count = 0, minLen = Infinity, startNode = 0;
  const required = Object.keys(targetFreq).length;
  
  while (r < s.length) {
    const char = s[r];
    windowFreq[char] = (windowFreq[char] || 0) + 1;
    if (targetFreq[char] && windowFreq[char] === targetFreq[char]) {
      count++;
    }
    
    while (count === required) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1;
        startNode = l;
      }
      const leftChar = s[l];
      windowFreq[leftChar]--;
      if (targetFreq[leftChar] && windowFreq[leftChar] < targetFreq[leftChar]) {
        count--;
      }
      l++;
    }
    r++;
  }
  return minLen === Infinity ? '' : s.substring(startNode, startNode + minLen);
}