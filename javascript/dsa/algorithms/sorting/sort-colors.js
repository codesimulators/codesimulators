function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        // 1️⃣ Inspect: What color is at mid?
        if (nums[mid] === 0) {
            // 2️⃣ Red → swap to front
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++; mid++;
        } else if (nums[mid] === 1) {
            // 3️⃣ White → already in place
            mid++;
        } else {
            // 4️⃣ Blue → swap to back
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}