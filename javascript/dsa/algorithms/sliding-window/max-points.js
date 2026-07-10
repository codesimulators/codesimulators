function maxScore(cardPoints, k) {
    let n = cardPoints.length;
    let windowSize = n - k;
    let totalSum = 0;
    for (let i = 0; i < n; i++) {
        totalSum += cardPoints[i];
    }

    let left = 0;
    let currentSum = 0;
    let minSum = Infinity;

    for (let right = 0; right < n; right++) {
        // 1️⃣ Expand
        currentSum += cardPoints[right];

        // 2️⃣ When window size reaches k (n-k in this case)
        if (right - left + 1 === windowSize) {
            // 3️⃣ Record / Evaluate
            if (currentSum < minSum) {
                minSum = currentSum;
            }

            // 4️⃣ Slide window
            currentSum -= cardPoints[left];
            left++;
        }
    }
    if (n === k) return totalSum;
    return totalSum - minSum;
}