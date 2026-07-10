func maxSlidingWindow(nums []int, k int) []int {
    var q []int
    var res []int
    left := 0

    for right, n := range nums {
        // 1️⃣ Expand: Maintain monotonic property
        for len(q) > 0 && nums[q[len(q)-1]] <= n {
            q = q[:len(q)-1]
        }
        q = append(q, right)

        // 2️⃣ When window size reaches k
        if right - left + 1 == k {
            // 3️⃣ Record / Evaluate
            res = append(res, nums[q[0]])
        }
    }

    return res
}