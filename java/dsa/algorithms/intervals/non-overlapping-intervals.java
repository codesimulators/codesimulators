class Solution {
    public int eraseOverlapIntervals(int[][] intervals) { // @viz:init
        if (intervals.length == 0) { // @viz:earlyCheck
            return 0; // @viz:earlyReturn
        }
        
        // 1️⃣ Sort by END time (Greedy Choice)
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1])); // @viz:sort
        
        int removals = 0; // @viz:varsRem
        int lastEnd = intervals[0][1]; // @viz:varsEnd
        
        for (int i = 1; i < intervals.length; i++) { // @viz:loop
            // 2️⃣ Check for overlap with the previous finish line
            if (intervals[i][0] < lastEnd) { // @viz:check
                removals++; // @viz:remove
            } else {
                // 3️⃣ No overlap: update the finish line
                lastEnd = intervals[i][1]; // @viz:keep
            }
        }
        
        return removals; // @viz:return
    }
}