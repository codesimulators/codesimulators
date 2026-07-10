func checkInclusion(target string, searchString string) bool {
    if len(target) > len(searchString) { return false }

    targetFreq := make([]int, 26)
    windowFreq := make([]int, 26)
    for i := 0; i < len(target); i++ {
        targetFreq[target[i]-'a']++
    }

    left := 0
    for right := 0; right < len(searchString); right++ {
        // 1️⃣ Expand
        windowFreq[searchString[right]-'a']++

        // 2️⃣ When window size reaches k
        if right - left + 1 == len(target) {
            // 3️⃣ Record / Evaluate
            if checkMatch(targetFreq, windowFreq) {
                return true
            }

            // 4️⃣ Slide window
            windowFreq[searchString[left]-'a']--
            left++
        }
    }
    return false
}

func checkMatch(targetFreq []int, windowFreq []int) bool {
    for j := 0; j < 26; j++ {
        if targetFreq[j] != windowFreq[j] {
            return false
        }
    }
    return true
}