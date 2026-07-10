func maxSlidingWindow(nums []int, k int) []int {
    dq := []int{}
    res := []int{}
    left := 0

    for right := 0; right < len(nums); right++ {
        // 1. Expand
        for len(dq) > 0 && nums[dq[len(dq)-1]] <= nums[right] {
            dq = dq[:len(dq)-1]
        }
        dq = append(dq, right)

        // 2. Condition
        if right - left + 1 == k {
            // 3. Record
            res = append(res, nums[dq[0]])

            // 4. Slide
            if dq[0] == left {
                dq = dq[1:]
            }
            left++
        }
    }
    return res
}