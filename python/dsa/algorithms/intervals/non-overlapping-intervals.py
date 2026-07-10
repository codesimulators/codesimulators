def eraseOverlapIntervals(intervals: List[List[int]]) -> int: # @viz:init
    if not intervals: # @viz:earlyCheck
        return 0 # @viz:earlyReturn
    
    # 1️⃣ Sort by END time (Greedy Choice)
    intervals.sort(key=lambda x: x[1]) # @viz:sort
    
    removals = 0 # @viz:varsRem
    last_end = intervals[0][1] # @viz:varsEnd
    
    for i in range(1, len(intervals)): # @viz:loop
        # 2️⃣ Check for overlap with the previous finish line
        if intervals[i][0] < last_end: # @viz:check
            removals += 1 # @viz:remove
        else:
            # 3️⃣ No overlap: update the finish line
            last_end = intervals[i][1] # @viz:keep
            
    return removals # @viz:return