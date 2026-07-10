func eraseOverlapIntervals(intervals [][]int) int { // @viz:init
    if len(intervals) == 0 { // @viz:earlyCheck
        return 0 // @viz:earlyReturn
    }
    
    // 1️⃣ Sort by END time (Greedy Choice)
    sort.Slice(intervals, func(i, j int) bool { // @viz:sort
        return intervals[i][1] < intervals[j][1]
    })
    
    removals := 0 // @viz:varsRem
    lastEnd := intervals[0][1] // @viz:varsEnd
    
    for i := 1; i < len(intervals); i++ { // @viz:loop
        // 2️⃣ Check for overlap with the previous finish line
        if intervals[i][0] < lastEnd { // @viz:check
            removals++ // @viz:remove
        } else {
            // 3️⃣ No overlap: update the finish line
            lastEnd = intervals[i][1] // @viz:keep
        }
    }
    
    return removals // @viz:return
}