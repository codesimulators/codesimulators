int strStr(string haystack, string needle) {
    if (needle.empty())
        return 0;
    int n = haystack.length(), m = needle.length();
    for (int i = 0; i <= n - m; i++) {
        if (haystack.substr(i, m) == needle) {
            return i;
        }
    }
    return -1;
}