function findKthLargest(nums, k) {
  const minHeap = new PriorityQueue();
  for (let num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }
  return minHeap.peek();
}