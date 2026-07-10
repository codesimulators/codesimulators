class MedianFinder {
  constructor() {
    this.maxHeap = [];
    this.minHeap = [];
  }
  addNum(num) {
    this.maxHeap.push(-num);
    this.maxHeap.sort((a,b) => a-b);
    if (this.minHeap.length && -this.maxHeap[0] > this.minHeap[0]) {
      this.minHeap.push(-this.maxHeap.shift());
      this.minHeap.sort((a,b) => a-b);
    }
    if (this.maxHeap.length > this.minHeap.length + 1) {
      this.minHeap.push(-this.maxHeap.shift());
      this.minHeap.sort((a,b) => a-b);
    } else if (this.minHeap.length > this.maxHeap.length) {
      this.maxHeap.push(-this.minHeap.shift());
      this.maxHeap.sort((a,b) => a-b);
    }
  }
  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return -this.maxHeap[0];
    }
    return (-this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}