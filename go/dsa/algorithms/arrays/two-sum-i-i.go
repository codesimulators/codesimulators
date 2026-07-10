func twoSum(numbers []int, target int) []int {
    // 🟠 INITIALIZE: Start pointers at opposite ends
    left, right := 0, len(numbers) - 1

    // 🟢 LOOP & PROCESS: Converge until match or pointers meet
    for left < right {
        // 1️⃣ Process: Evaluate the current state
        currentSum := numbers[left] + numbers[right]
        
        if currentSum == target {
            return []int{left + 1, right + 1}
        }

        // 2️⃣ Decide and Act: Shrink search space
        if currentSum < target {
            left++ // Sum too small, move left inward
        } else {
            right-- // Sum too large, move right inward
        }
    }
    return []int{}
}