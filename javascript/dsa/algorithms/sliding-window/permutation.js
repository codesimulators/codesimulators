function checkInclusion(target, searchString) {
    if (target.length > searchString.length) return false;

    let targetFreq = new Array(26).fill(0);
    let windowFreq = new Array(26).fill(0);
    for (let i = 0; i < target.length; i++) {
        targetFreq[target.charCodeAt(i) - 97]++;
    }

    let left = 0;
    for (let right = 0; right < searchString.length; right++) {
        // 1️⃣ Expand
        windowFreq[searchString.charCodeAt(right) - 97]++;

        // 2️⃣ When window size reaches k
        if (right - left + 1 === target.length) {
            // 3️⃣ Record / Evaluate
            if (checkMatch(targetFreq, windowFreq)) {
                return true;
            }

            // 4️⃣ Slide window
            windowFreq[searchString.charCodeAt(left) - 97]--;
            left++;
        }
    }
    return false;
}

function checkMatch(targetFreq, windowFreq) {
    for (let j = 0; j < 26; j++) {
        if (targetFreq[j] !== windowFreq[j]) {
            return false;
        }
    }
    return true;
}