function findAnagrams(s, p) {
    const result = [];
    if (s.length < p.length) return result;

    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - 97]++;
    }

    let left = 0;
    for (let right = 0; right < s.length; right++) {
        // 1️⃣ Expand
        sCount[s.charCodeAt(right) - 97]++;

        // 2️⃣ When window size reaches k
        if (right - left + 1 === p.length) {
            // 3️⃣ Record / Evaluate
            if (checkMatch(pCount, sCount)) {
                result.push(left);
            }

            // 4️⃣ Slide window
            sCount[s.charCodeAt(left) - 97]--;
            left++;
        }
    }
    return result;
}

function checkMatch(c1, c2) {
    for (let i = 0; i < 26; i++) {
        if (c1[i] !== c2[i]) return false;
    }
    return true;
}