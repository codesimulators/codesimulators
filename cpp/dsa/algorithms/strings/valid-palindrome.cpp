class Solution {
public:
    bool isPalindrome(string s) {
        // 🟠 INITIALIZE: Start pointers at boundaries
        int left = 0, right = s.length() - 1;

        // 🟢 LOOP & PROCESS: Converge until mismatch or meet
        while (left < right) {
            // 1️⃣ Process: Evaluate if characters match
            bool isLeftAlpha = isalnum(s[left]);
            bool isRightAlpha = isalnum(s[right]);

            if (isLeftAlpha && isRightAlpha) {
                if (tolower(s[left]) != tolower(s[right])) {
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
};