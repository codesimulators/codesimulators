func isPalindrome(s string) bool {
    // 🟠 INITIALIZE: Start pointers at boundaries
    left, right := 0, len(s)-1

    // 🟢 LOOP & PROCESS: Converge until mismatch or meet
    for left < right {
        // 1️⃣ Process: Evaluate if characters match
        isLeftAlpha := isAlphanumeric(s[left])
        isRightAlpha := isAlphanumeric(s[right])

        if isLeftAlpha && isRightAlpha {
            if unicode.ToLower(rune(s[left])) != unicode.ToLower(rune(s[right])) {
                return false
            }
        }

        // 2️⃣ Decide and Act: Skip non-alphanumeric or move both
        if !isLeftAlpha {
            left++
        } else if !isRightAlpha {
            right--
        } else {
            left++
            right--
        }
    }
    return true
}