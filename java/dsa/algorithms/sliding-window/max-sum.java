public class SlidingWindow {
    public int findMaxSumSubArray(int[] arr, int k) {
        int left = 0;
        int windowSum = 0;
        int maxSum = Integer.MIN_VALUE;

        for (int right = 0; right < arr.length; right++) {
            // 1️⃣ Expand
            windowSum += arr[right];

            // 2️⃣ When window size reaches k
            if (right - left + 1 == k) {
                // 3️⃣ Record / Evaluate
                maxSum = Math.max(maxSum, windowSum);

                // 4️⃣ Slide window
                windowSum -= arr[left];
                left++;
            }
        }
        return maxSum;
    }
}