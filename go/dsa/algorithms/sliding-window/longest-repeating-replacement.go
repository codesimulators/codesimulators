func characterReplacement(s string, k int) int {
    frequencyMap := make([]int, 26)
    maxFrequency := 0
    left := 0
    maxLength := 0

    for right := 0; right < len(s); right++ {
        // 1️⃣ Expand
        charIndex := s[right] - 'A'
        frequencyMap[charIndex]++
        if frequencyMap[charIndex] > maxFrequency {
            maxFrequency = frequencyMap[charIndex]
        }

        // 2️⃣ Condition: while invalid
        for right - left + 1 - maxFrequency > k {
            // 3️⃣ Contract
            leftCharIndex := s[left] - 'A'
            frequencyMap[leftCharIndex]--
            left++
        }

        // 4️⃣ Record / Optimize
        if right - left + 1 > maxLength {
            maxLength = right - left + 1
        }
    }

    return maxLength
}