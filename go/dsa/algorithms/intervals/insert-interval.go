func insert(intervals [][]int, newInterval []int) [][]int { // @viz:init
    result := make([][]int, 0)
    i, n := 0, len(intervals)

    // 1️⃣ Add all intervals ending before newInterval starts
    for i < n && intervals[i][1] < newInterval[0] { // @viz:before
        result = append(result, intervals[i]) // @viz:beforePush
        i++ // @viz:beforeInc
    }

    // 2️⃣ Merge all overlapping intervals
    for i < n && intervals[i][0] <= newInterval[1] { // @viz:merge
        newInterval[0] = min(newInterval[0], intervals[i][0]) // @viz:mergeUpdate
        newInterval[1] = max(newInterval[1], intervals[i][1]) // @viz:mergeUpdate
        i++ // @viz:mergeInc
    }
    result = append(result, newInterval) // @viz:addMerged

    // 3️⃣ Add remaining intervals
    for i < n { // @viz:after
        result = append(result, intervals[i]) // @viz:afterPush
        i++ // @viz:afterInc
    }

    return result // @viz:return
}

func min(a, b int) int { if a < b { return a }; return b }
func max(a, b int) int { if a > b { return a }; return b }