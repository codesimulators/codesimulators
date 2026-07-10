def topKFrequent(nums, k):
    freq = Counter(nums)
    for n in nums:
        freq[n] += 1
    heap = []
    for num, count in freq.items():
        heapq.heappush(heap, (count, num))
        if len(heap) > k:
            heapq.heappop(heap)
    res = []
    while heap:
        res.append(heapq.heappop(heap)[1])
    return res