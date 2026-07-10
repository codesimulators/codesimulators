int maxScore(vector<int>& cardPoints, int k) {
    int n = cardPoints.size();
    int windowSize = n - k;
    int totalSum = 0;
    for (int i = 0; i < n; i++) {
        totalSum += cardPoints[i];
    }

    int left = 0;
    int currentSum = 0;
    int minSum = numeric_limits<int>::max();

    for (int right = 0; right < n; right++) {
        // 1️⃣ Expand
        currentSum += cardPoints[right];

        // 2️⃣ When window size reaches k (n-k in this case)
        if (right - left + 1 == windowSize) {
            // 3️⃣ Record / Evaluate
            if (currentSum < minSum) {
                minSum = currentSum;
            }

            // 4️⃣ Slide window
            currentSum -= cardPoints[left];
            left++;
        }
    }
    if (n == k) return totalSum;
    return totalSum - minSum;
}