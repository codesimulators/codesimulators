def leastInterval(tasks, n):
    freq = Counter(tasks)
    for t in tasks: freq[t] += 1
    # (Simplified for visualization)
    max_heap = []
    for c in freq.values():
        heapq.heappush(max_heap, -c)
    time = 0
    while max_heap:
        cycle = []
        for _ in range(n + 1):
            if max_heap:
                cycle.append(heapq.heappop(max_heap))
        for c in cycle:
            if c + 1 < 0:
                heapq.heappush(max_heap, c + 1)
        time += len(max_heap) and n + 1 or len(cycle)
    return time