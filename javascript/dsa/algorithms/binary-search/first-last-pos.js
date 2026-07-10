function searchRange(nums, target) {
    function findBound(isFirst) {
        let left = 0;
        let right = nums.length - 1;
        let bound = -1;
        
        while (left <= right) {
            let mid = Math.floor(left + (right - left) / 2);
            if (nums[mid] === target) {
                bound = mid;
                if (isFirst) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return bound;
    }
    
    const first = findBound(true);
    const last = findBound(false);
    return [first, last];
}