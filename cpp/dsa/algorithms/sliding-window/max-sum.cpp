int findMaxSumSubArray(vector<int>& arr, int k) {
    int left = 0;
    int windowSum = 0;
    int maxSum = INT_MIN;

    for (int right = 0; right < arr.size(); right++) {
        // 1️⃣ Expand
        windowSum += arr[right];

        // 2️⃣ When window size reaches k
        if (right - left + 1 == k) {
            // 3️⃣ Record / Evaluate
            maxSum = max(maxSum, windowSum);

            // 4️⃣ Slide window
            windowSum -= arr[left];
            left++;
        }
    }
    return maxSum;
}