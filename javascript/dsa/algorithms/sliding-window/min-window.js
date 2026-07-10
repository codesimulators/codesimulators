function minWindow(s, t) {
    if (s.length < t.length) return "";

    const targetFreq = {};
    for (const char of t) {
        targetFreq[char] = (targetFreq[char] || 0) + 1;
    }

    const requiredMatches = Object.keys(targetFreq).length;
    const windowFreq = {};
    let left = 0, matchCount = 0;
    let minLength = Infinity, bestStart = 0;

    for (let right = 0; right < s.length; right++) {
        // 1️⃣ Expand
        const char = s[right];
        if (targetFreq[char]) {
            windowFreq[char] = (windowFreq[char] || 0) + 1;
            if (windowFreq[char] === targetFreq[char]) {
                matchCount++;
            }
        }

        // 2️⃣ Condition: while valid
        while (matchCount === requiredMatches) {
            // 4️⃣ Record / Optimize
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                bestStart = left;
            }

            // 3️⃣ Contract
            const leftChar = s[left];
            if (targetFreq[leftChar]) {
                if (windowFreq[leftChar] === targetFreq[leftChar]) {
                    matchCount--;
                }
                windowFreq[leftChar]--;
            }
            left++;
        }
    }

    return minLength === Infinity ? "" : s.substring(bestStart, bestStart + minLength);
}