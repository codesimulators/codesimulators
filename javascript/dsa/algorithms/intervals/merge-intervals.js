/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) { // @viz:mainCall
    if (intervals.length <= 1) return intervals; // @viz:earlyReturn
    
    // 1️⃣ Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]); // @viz:sort
    
    let result = [intervals[0]]; // @viz:init
    
    // 2️⃣ Iterate through the sorted intervals
    for (let i = 1; i < intervals.length; i++) { // @viz:loop
        let lastMerged = result[result.length - 1]; // @viz:getAnchor
        let current = intervals[i]; // @viz:getCurrent
        
        // 3️⃣ Check for overlap
        if (current[0] <= lastMerged[1]) { // @viz:checkOverlap
            // Overlap: merge by extending the end time
            lastMerged[1] = Math.max(lastMerged[1], current[1]); // @viz:merge
        } else {
            // No overlap: add as a new merged interval
            result.push(current); // @viz:push
        }
    }
    
    return result; // @viz:return
};