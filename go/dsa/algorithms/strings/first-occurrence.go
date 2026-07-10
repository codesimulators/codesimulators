func strStr(haystack string, needle string) int {
    if needle == "" {
        return 0
    }
    n, m := len(haystack), len(needle)
    for i := 0; i <= n-m; i++ {
        if haystack[i:i+m] == needle {
            return i
        }
    }
    return -1
}