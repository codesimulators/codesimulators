function leastInterval(tasks, n) {
  const freq = {};
  for (const t of tasks) {
    freq[t] = (freq[t] || 0) + 1;
  }
  const maxHeap = [];
  for (const f of Object.values(freq)) {
    maxHeap.push(f);
  }
  maxHeap.sort((a, b) => b - a);
  let time = 0;
  while (maxHeap.length) {
    const cycle = [];
    for (let i = 0; i <= n; i++) {
      if (maxHeap.length) {
        cycle.push(maxHeap.shift() - 1);
      }
    }
    for (const c of cycle) {
      if (c > 0) {
        maxHeap.push(c);
      }
    }
    maxHeap.sort((a, b) => b - a);
    time += maxHeap.length ? n + 1 : cycle.length;
  }
  return time;
}