public class SlidingWindowMax {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) return new int[0];
        int[] res = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();
        int left = 0;

        for (int right = 0; right < n; right++) {
            // 1️⃣ Expand: Maintain monotonic property
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[right]) {
                dq.pollLast();
            }
            dq.offerLast(right);

            // 2️⃣ When window size reaches k
            if (right - left + 1 == k) {
                // 3️⃣ Record / Evaluate
                res[left] = nums[dq.peekFirst()];

                // 4️⃣ Slide window
                if (dq.peekFirst() == left) dq.pollFirst();
                left++;
            }
        }
        return res;
    }
}