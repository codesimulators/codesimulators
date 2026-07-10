int findLength(string s) {
    unordered_map<char, int> charMap;
    int left = 0;
    int maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        // 1️⃣ Expand
        char c = s[right];

        // 2️⃣ Condition: Check for duplicates
        if (charMap.count(c)) {
            // 3️⃣ Contract: Jump left pointer
            if (charMap[c] + 1 > left) {
                left = charMap[c] + 1;
            }
        }

        // 4️⃣ Record / Optimize
        charMap[c] = right;
        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
        }
    }

    return maxLen;
}