function isPalindrome(s) {
    // 🟠 INITIALIZE: Start pointers at boundaries
    let left = 0, right = s.length - 1;

    // 🟢 LOOP & PROCESS: Converge until mismatch or meet
    while (left < right) {
        // 1️⃣ Process: Evaluate if characters match
        const isLeftAlpha = /[a-zA-Z0-9]/.test(s[left]);
        const isRightAlpha = /[a-zA-Z0-9]/.test(s[right]);

        if (isLeftAlpha && isRightAlpha) {
            if (s[left].toLowerCase() !== s[right].toLowerCase()) {
                return false;
            }
        }

        // 2️⃣ Decide and Act: Skip non-alphanumeric or move both
        if (!isLeftAlpha) {
            left++;
        } else if (!isRightAlpha) {
            right--;
        } else {
            left++;
            right--;
        }
    }
    return true;
}