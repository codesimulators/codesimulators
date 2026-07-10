class Solution {
    public boolean isPalindrome(String s) {
        // 🟠 INITIALIZE: Start pointers at boundaries
        int left = 0, right = s.length() - 1;

        // 🟢 LOOP & PROCESS: Converge until mismatch or meet
        while (left < right) {
            // 1️⃣ Process: Evaluate if characters match
            boolean isLeftAlpha = Character.isLetterOrDigit(s.charAt(left));
            boolean isRightAlpha = Character.isLetterOrDigit(s.charAt(right));

            if (isLeftAlpha && isRightAlpha) {
                if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
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
}