function topKFrequent(nums, k) {
  const freq = {};
  for (const n of nums) {
    freq[n] = (freq[n] || 0) + 1;
  }
  const minHeap = [];
  for (const [num, count] of Object.entries(freq)) {
    minHeap.push([count, Number(num)]);
    minHeap.sort((a, b) => a[0] - b[0]);
    if (minHeap.length > k) {
      minHeap.shift();
    }
  }
  const result = [];
  while (minHeap.length > 0) {
    result.push(minHeap.pop()[1]);
  }
  return result;
}