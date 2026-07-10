function maxSlidingWindow(nums, k) {
    let q = [];
    let res = [];
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        // 1️⃣ Expand: Maintain monotonic property
        while (q.length && nums[q[q.length - 1]] <= nums[right]) {
            q.pop();
        }
        q.push(right);

        // 2️⃣ When window size reaches k
        if (right - left + 1 === k) {
            // 3️⃣ Record / Evaluate
            res.push(nums[q[0]]);
        }
    }

    return res;
}