function longestSubstring(s) {
    let charMap = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // 1️⃣ Expand
        let char = s[right];

        // 2️⃣ Condition: Check for duplicates
        if (charMap.has(char)) {
            // 3️⃣ Contract: Jump left pointer
            if (charMap.get(char) + 1 > left) {
                left = charMap.get(char) + 1;
            }
        }

        // 4️⃣ Record / Optimize
        charMap.set(char, right);
        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
        }
    }

    return maxLen;
}