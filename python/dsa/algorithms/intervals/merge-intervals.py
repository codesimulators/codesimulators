class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]: # @viz:mainCall
        if not intervals: return [] # @viz:earlyReturn
        
        # 1️⃣ Sort intervals by start time
        intervals.sort(key=lambda x: x[0]) # @viz:sort
        
        result = [intervals[0]] # @viz:init
        
        # 2️⃣ Iterate through the sorted intervals
        for i in range(1, len(intervals)): # @viz:loop
            last_merged = result[-1] # @viz:getAnchor
            current = intervals[i] # @viz:getCurrent
            
            # 3️⃣ Check for overlap
            if current[0] <= last_merged[1]: # @viz:checkOverlap
                # Overlap: merge by extending the end time
                last_merged[1] = max(last_merged[1], current[1]) # @viz:merge
            else:
                # No overlap: add as a new merged interval
                result.append(current) # @viz:push
                
        return result # @viz:return