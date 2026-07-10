function frequencySort(s) {
  const counts = {};
  for (let char of s) {
    counts[char] = (counts[char] || 0) + 1;
  }
  
  const n = s.length;
  const buckets = Array.from({ length: n + 1 }, () => []);
  for (let char in counts) {
    buckets[counts[char]].push(char);
  }
  
  let res = "";
  for (let f = n; f >= 1; f--) {
    for (let char of buckets[f]) {
      res += char.repeat(f);
    }
  }
  return res;
}