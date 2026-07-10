public class SlidingWindowMax {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();
        int left = 0;

        for (int right = 0; right < n; right++) {
            // 1. Expand
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[right]) {
                dq.pollLast();
            }
            dq.offerLast(right);

            // 2. Condition
            if (right - left + 1 == k) {
                // 3. Record
                res[left] = nums[dq.peekFirst()];

                // 4. Slide
                if (dq.peekFirst() == left) {
                    dq.pollFirst();
                }
                left++;
            }
        }
        return res;
    }
}