function singleNonDuplicate(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        
        // Ensure mid is even for pair checking
        if (mid % 2 === 1) mid--;

        if (nums[mid] === nums[mid + 1]) {
            // Pair matches, so single element is to the right
            left = mid + 2;
        } else {
            // Pair mismatch, single element is left (or is mid)
            right = mid;
        }
    }
    return nums[left];
}