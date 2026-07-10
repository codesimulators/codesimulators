func minWindow(s string, t string) string {
    if len(s) < len(t) { return "" }
    targetFreq := make(map[byte]int)
    for i := 0; i < len(t); i++ { targetFreq[t[i]]++ }
    
    windowFreq := make(map[byte]int)
    l, r, count, minLen, start := 0, 0, 0, 1<<31-1, 0
    required := len(targetFreq)
    
    for r < len(s) {
        char := s[r]
        windowFreq[char]++
        if targetFreq[char] > 0 && windowFreq[char] == targetFreq[char] {
            count++
        }
        
        for count == required {
            if r-l+1 < minLen {
                minLen = r - l + 1
                start = l
            }
            leftChar := s[l]
            windowFreq[leftChar]--
            if targetFreq[leftChar] > 0 && windowFreq[leftChar] < targetFreq[leftChar] {
                count--
            }
            l++
        }
        r++
    }
    if minLen == 1<<31-1 { return "" }
    return s[start : start+minLen]
}