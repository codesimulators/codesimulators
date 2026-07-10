function characterReplacement(s, k) {
    const frequencyMap = new Array(26).fill(0);
    let maxFrequency = 0;
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        // 1️⃣ Expand
        const charIndex = s.charCodeAt(right) - 65;
        frequencyMap[charIndex]++;
        if (frequencyMap[charIndex] > maxFrequency) {
            maxFrequency = frequencyMap[charIndex];
        }

        // 2️⃣ Condition: while invalid
        while (right - left + 1 - maxFrequency > k) {
            // 3️⃣ Contract
            const leftCharIndex = s.charCodeAt(left) - 65;
            frequencyMap[leftCharIndex]--;
            left++;
        }

        // 4️⃣ Record / Optimize
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
        }
    }

    return maxLength;
}