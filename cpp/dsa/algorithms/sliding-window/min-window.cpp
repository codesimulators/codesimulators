string minWindow(string s, string t) {
    if (s.length() < t.length()) return "";

    unordered_map<char, int> targetFreq;
    for (char c : t) {
        targetFreq[c]++;
    }

    int requiredMatches = targetFreq.size();
    unordered_map<char, int> windowFreq;
    int left = 0, matchCount = 0;
    int minLength = INT_MAX, bestStart = 0;

    for (int right = 0; right < s.length(); right++) {
        // 1️⃣ Expand
        char c = s[right];
        if (targetFreq.count(c)) {
            windowFreq[c]++;
            if (windowFreq[c] == targetFreq[c]) {
                matchCount++;
            }
        }

        // 2️⃣ Condition: while valid
        while (matchCount == requiredMatches) {
            // 4️⃣ Record / Optimize
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                bestStart = left;
            }

            // 3️⃣ Contract
            char leftChar = s[left];
            if (targetFreq.count(leftChar)) {
                if (windowFreq[leftChar] == targetFreq[leftChar]) {
                    matchCount--;
                }
                windowFreq[leftChar]--;
            }
            left++;
        }
    }

    return minLength == INT_MAX ? "" : s.substr(bestStart, minLength);
}