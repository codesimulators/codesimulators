class MedianFinder:
    def __init__(self):
        self.max_heap = []
        self.min_heap = []
    def addNum(self, num):
        heapq.heappush(self.max_heap, -num)
        if self.min_heap and -self.max_heap[0] > self.min_heap[0]:
            heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        if len(self.max_heap) > len(self.min_heap) + 1:
            heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        elif len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
    def findMedian(self):
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2