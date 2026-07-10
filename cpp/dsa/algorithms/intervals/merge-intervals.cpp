class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) { // @viz:mainCall
        if (intervals.size() <= 1) return intervals; // @viz:earlyReturn
        
        // 1️⃣ Sort intervals by start time
        sort(intervals.begin(), intervals.end()); // @viz:sort
        
        vector<vector<int>> result; // @viz:init
        result.push_back(intervals[0]); // @viz:init
        
        // 2️⃣ Iterate through the sorted intervals
        for (int i = 1; i < intervals.size(); i++) { // @viz:loop
            vector<int>& lastMerged = result.back(); // @viz:getAnchor
            vector<int>& current = intervals[i]; // @viz:getCurrent
            
            // 3️⃣ Check for overlap
            if (current[0] <= lastMerged[1]) { // @viz:checkOverlap
                // Overlap: merge by extending the end time
                lastMerged[1] = max(lastMerged[1], current[1]); // @viz:merge
            } else {
                // No overlap: add as a new merged interval
                result.push_back(current); // @viz:push
            }
        }
        
        return result; // @viz:return
    }
};