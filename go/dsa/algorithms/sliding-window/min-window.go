func minWindow(s string, t string) string {
    if len(s) < len(t) {
        return ""
    }

    targetFreq := make(map[byte]int)
    for i := 0; i < len(t); i++ {
        targetFreq[t[i]]++
    }

    requiredMatches := len(targetFreq)
    windowFreq := make(map[byte]int)
    left, matchCount := 0, 0
    minLength, bestStart := 1<<31-1, 0

    for right := 0; right < len(s); right++ {
        // 1️⃣ Expand
        c := s[right]
        if count, ok := targetFreq[c]; ok {
            windowFreq[c]++
            if windowFreq[c] == count {
                matchCount++
            }
        }

        // 2️⃣ Condition: while valid
        for matchCount == requiredMatches {
            // 4️⃣ Record / Optimize
            if right - left + 1 < minLength {
                minLength = right - left + 1
                bestStart = left
            }

            // 3️⃣ Contract
            leftChar := s[left]
            if count, ok := targetFreq[leftChar]; ok {
                if windowFreq[leftChar] == count {
                    matchCount--
                }
                windowFreq[leftChar]--
            }
            left++
        }
    }

    if minLength == 1<<31-1 {
        return ""
    }
    return s[bestStart : bestStart+minLength]
}