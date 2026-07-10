class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) { // @viz:init
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;

        // 1️⃣ Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) { // @viz:before
            result.add(intervals[i]); // @viz:beforePush
            i++; // @viz:beforeInc
        }

        // 2️⃣ Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) { // @viz:merge
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]); // @viz:mergeUpdate
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]); // @viz:mergeUpdate
            i++; // @viz:mergeInc
        }
        result.add(newInterval); // @viz:addMerged

        // 3️⃣ Add remaining intervals
        while (i < n) { // @viz:after
            result.add(intervals[i]); // @viz:afterPush
            i++; // @viz:afterInc
        }

        return result.toArray(new int[result.size()][]); // @viz:return
    }
}