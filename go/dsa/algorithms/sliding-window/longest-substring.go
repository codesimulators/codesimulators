func findLength(s string) int {
    charMap := make(map[byte]int)
    left := 0
    maxLen := 0

    for right := 0; right < len(s); right++ {
        // 1️⃣ Expand
        c := s[right]

        // 2️⃣ Condition: Check for duplicates
        if idx, found := charMap[c]; found {
            // 3️⃣ Contract: Jump left pointer
            if idx + 1 > left {
                left = idx + 1
            }
        }

        // 4️⃣ Record / Optimize
        charMap[c] = right
        if right - left + 1 > maxLen {
            maxLen = right - left + 1
        }
    }

    return maxLen
}