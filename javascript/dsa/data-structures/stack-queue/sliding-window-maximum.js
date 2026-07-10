function maxSlidingWindow(nums, k) {
  let left = 0;
  let q = [];
  let res = [];

  for (let right = 0; right < nums.length; right++) {
    // 1️⃣ Expand (Maintain Monotonicity)
    while (q.length > 0 && nums[q[q.length - 1]] <= nums[right]) {
      q.pop();
    }
    q.push(right);

    // 2️⃣ When window size reaches k
    if (right - left + 1 === k) {
      // 3️⃣ Record
      res.push(nums[q[0]]);

      // 4️⃣ Slide window
      if (q[0] === left) {
        q.shift();
      }
      left++;
    }
  }
  return res;
}