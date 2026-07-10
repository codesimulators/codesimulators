func findAnagrams(s string, p string) []int {
    var result []int
    if len(s) < len(p) { return result }

    pCount, sCount := [26]int{}, [26]int{}
    for i := 0; i < len(p); i++ {
        pCount[p[i]-'a']++
    }

    left := 0
    for right := 0; right < len(s); right++ {
        // 1️⃣ Expand
        sCount[s[right]-'a']++

        // 2️⃣ When window size reaches k
        if right - left + 1 == len(p) {
            // 3️⃣ Record / Evaluate
            if sCount == pCount {
                result = append(result, left)
            }

            // 4️⃣ Slide window
            sCount[s[left]-'a']--
            left++
        }
    }
    return result
}