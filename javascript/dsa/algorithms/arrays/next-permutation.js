function nextPermutation(nums) {
    // 1. Find pivot (first decreasing from right)
    let pivot = nums.length - 2;
    while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) {
        pivot--;
    }
    // 2. Find successor and swap
    if (pivot >= 0) {
        let successor = nums.length - 1;
        while (nums[successor] <= nums[pivot]) {
            successor--;
        }
        [nums[pivot], nums[successor]] = [nums[successor], nums[pivot]];
    }
    // 3. Reverse suffix
    let left = pivot + 1, right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
}