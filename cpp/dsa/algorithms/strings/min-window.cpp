string minWindow(string s, string t) {
    if (s.length() < t.length()) return "";
    unordered_map<char, int> target, window;
    for (char c : t) target[c]++;
    
    int l = 0, r = 0, count = 0, minLen = INT_MAX, start = 0;
    int required = target.size();
    
    for (r = 0; r < s.length(); r++) {
        char c = s[r];
        window[c]++;
        if (target.count(c) && window[c] == target[c]) {
            count++;
        }
        
        while (count == required) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                start = l;
            }
            char left = s[l];
            if (target.count(left) && window[left] == target[left]) count--;
            window[left]--;
            l++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}