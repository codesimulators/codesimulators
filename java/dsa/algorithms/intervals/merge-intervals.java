class Solution {
    public int[][] merge(int[][] intervals) { // @viz:mainCall
        if (intervals.length <= 1) return intervals; // @viz:earlyReturn
        
        // 1️⃣ Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0])); // @viz:sort
        
        List<int[]> result = new ArrayList<>(); // @viz:init
        result.add(intervals[0]); // @viz:init
        
        // 2️⃣ Iterate through the sorted intervals
        for (int i = 1; i < intervals.length; i++) { // @viz:loop
            int[] lastMerged = result.get(result.size() - 1); // @viz:getAnchor
            int[] current = intervals[i]; // @viz:getCurrent
            
            // 3️⃣ Check for overlap
            if (current[0] <= lastMerged[1]) { // @viz:checkOverlap
                // Overlap: merge by extending the end time
                lastMerged[1] = Math.max(lastMerged[1], current[1]); // @viz:merge
            } else {
                // No overlap: add as a new merged interval
                result.add(current); // @viz:push
            }
        }
        
        return result.toArray(new int[result.size()][]); // @viz:return
    }
}