function isSubsequence(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        // 1️⃣ Compare: Do characters match?
        if (s[i] === t[j]) {
            // 2️⃣ Match! Consume from subsequence
            i++;
        }
        // 3️⃣ Always advance through main string
        j++;
    }
    return i === s.length;
}