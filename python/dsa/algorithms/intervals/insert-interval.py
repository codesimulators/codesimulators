def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]: # @viz:init
    result = []
    i, n = 0, len(intervals)

    # 1️⃣ Add all intervals ending before newInterval starts
    while i < n and intervals[i][1] < newInterval[0]: # @viz:before
        result.append(intervals[i]) # @viz:beforePush
        i += 1 # @viz:beforeInc

    # 2️⃣ Merge all overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]: # @viz:merge
        newInterval[0] = min(newInterval[0], intervals[i][0]) # @viz:mergeUpdate
        newInterval[1] = max(newInterval[1], intervals[i][1]) # @viz:mergeUpdate
        i += 1 # @viz:mergeInc
    result.append(newInterval) # @viz:addMerged

    # 3️⃣ Add remaining intervals
    while i < n: # @viz:after
        result.append(intervals[i]) # @viz:afterPush
        i += 1 # @viz:afterInc

    return result # @viz:return