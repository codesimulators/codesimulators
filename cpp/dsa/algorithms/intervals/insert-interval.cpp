class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) { // @viz:init
        vector<vector<int>> result;
        int i = 0, n = intervals.size();

        // 1️⃣ Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) { // @viz:before
            result.push_back(intervals[i]); // @viz:beforePush
            i++; // @viz:beforeInc
        }

        // 2️⃣ Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) { // @viz:merge
            newInterval[0] = min(newInterval[0], intervals[i][0]); // @viz:mergeUpdate
            newInterval[1] = max(newInterval[1], intervals[i][1]); // @viz:mergeUpdate
            i++; // @viz:mergeInc
        }
        result.push_back(newInterval); // @viz:addMerged

        // 3️⃣ Add remaining intervals
        while (i < n) { // @viz:after
            result.push_back(intervals[i]); // @viz:afterPush
            i++; // @viz:afterInc
        }

        return result; // @viz:return
    }
};