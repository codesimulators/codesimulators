function hIndex(citations) {
  const n = citations.length;
  const buckets = new Array(n + 1).fill(0);
  
  for (let c of citations) {
    if (c >= n) {
      buckets[n]++;
    } else {
      buckets[c]++;
    }
  }
  
  let papersSeen = 0;
  for (let h = n; h >= 0; h--) {
    papersSeen += buckets[h];
    if (papersSeen >= h) {
      return h;
    }
  }
  return 0;
}