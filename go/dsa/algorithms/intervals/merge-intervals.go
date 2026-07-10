func merge(intervals [][]int) [][]int { // @viz:mainCall
    if len(intervals) <= 1 { // @viz:earlyReturn
        return intervals
    }
    
    // 1️⃣ Sort intervals by start time
    sort.Slice(intervals, func(i, j int) bool { // @viz:sort
        return intervals[i][0] < intervals[j][0]
    })
    
    result := [][]int{intervals[0]} // @viz:init
    
    // 2️⃣ Iterate through the sorted intervals
    for i := 1; i < len(intervals); i++ { // @viz:loop
        lastMerged := &result[len(result)-1] // @viz:getAnchor
        current := intervals[i] // @viz:getCurrent
        
        // 3️⃣ Check for overlap
        if current[0] <= (*lastMerged)[1] { // @viz:checkOverlap
            // Overlap: merge by extending the end time
            if current[1] > (*lastMerged)[1] { // @viz:merge
                (*lastMerged)[1] = current[1]
            }
        } else {
            // No overlap: add as a new merged interval
            result = append(result, current) // @viz:push
        }
    }
    
    return result // @viz:return
}