function findMaxSumSubArray(arr, k) {
    let left = 0;
    let windowSum = 0;
    let maxSum = -Infinity;

    for (let right = 0; right < arr.length; right++) {
        // 1️⃣ Expand
        windowSum += arr[right];

        // 2️⃣ When window size reaches k
        if (right - left + 1 === k) {
            // 3️⃣ Record / Evaluate
            maxSum = Math.max(maxSum, windowSum);

            // 4️⃣ Slide window
            windowSum -= arr[left];
            left++;
        }
    }
    return maxSum;
}