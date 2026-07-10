func isSubsequence(s string, t string) bool {
    i, j := 0, 0
    for i < len(s) && j < len(t) {
        // 1️⃣ Compare: Do characters match?
        if s[i] == t[j] {
            // 2️⃣ Match! Consume from subsequence
            i++
        }
        // 3️⃣ Always advance through main string
        j++
    }
    return i == len(s)
}