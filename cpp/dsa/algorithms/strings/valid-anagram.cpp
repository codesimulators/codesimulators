bool isAnagram(string s, string t) {
    if (s.length() != t.length()) {
        return false;
    }

    unordered_map<char, int> count;
    for (int i = 0; i < s.length(); i++) {
        char c = s[i];
        count[c]++;
    }

    for (int i = 0; i < t.length(); i++) {
        char c = t[i];
        if (count[c] == 0) {
            return false;
        }
        count[c]--;
    }

    return true;
}