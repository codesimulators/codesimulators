bool checkInclusion(string target, string searchString) {
    if (target.length() > searchString.length()) return false;

    vector<int> targetFreq(26, 0);
    vector<int> windowFreq(26, 0);
    for (int i = 0; i < target.length(); i++) {
        targetFreq[target[i] - 'a']++;
    }

    int left = 0;
    for (int right = 0; right < searchString.length(); right++) {
        // 1️⃣ Expand
        windowFreq[searchString[right] - 'a']++;

        // 2️⃣ When window size reaches k
        if (right - left + 1 == target.length()) {
            // 3️⃣ Record / Evaluate
            if (checkMatch(targetFreq, windowFreq)) {
                return true;
            }

            // 4️⃣ Slide window
            windowFreq[searchString[left] - 'a']--;
            left++;
        }
    }
    return false;
}

bool checkMatch(const vector<int>& targetFreq, const vector<int>& windowFreq) {
    for (int j = 0; j < 26; j++) {
        if (targetFreq[j] != windowFreq[j]) return false;
    }
    return true;
}