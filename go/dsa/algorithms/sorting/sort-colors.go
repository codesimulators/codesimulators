func sortColors(nums []int) {
    low, mid, high := 0, 0, len(nums)-1
    for mid <= high {
        // 1️⃣ Inspect: What color is at mid?
        if nums[mid] == 0 {
            // 2️⃣ Red → swap to front
            nums[low], nums[mid] = nums[mid], nums[low]
            low++; mid++
        } else if nums[mid] == 1 {
            // 3️⃣ White → already in place
            mid++
        } else {
            // 4️⃣ Blue → swap to back
            nums[mid], nums[high] = nums[high], nums[mid]
            high--
        }
    }
}