vector<int> findAnagrams(string s, string p) {
    vector<int> result;
    if (s.length() < p.length()) return result;

    vector<int> pCount(26, 0), sCount(26, 0);
    for (int i = 0; i < p.length(); i++) {
        pCount[p[i] - 'a']++;
    }

    int left = 0;
    for (int right = 0; right < s.length(); right++) {
        // 1️⃣ Expand
        sCount[s[right] - 'a']++;

        // 2️⃣ When window size reaches k
        if (right - left + 1 == p.length()) {
            // 3️⃣ Record / Evaluate
            if (pCount == sCount) {
                result.push_back(left);
            }

            // 4️⃣ Slide window
            sCount[s[left] - 'a']--;
            left++;
        }
    }
    return result;
}