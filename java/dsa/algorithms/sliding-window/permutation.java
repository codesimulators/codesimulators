public class Solution {
    public boolean checkInclusion(String target, String searchString) {
        if (target.length() > searchString.length()) return false;

        int[] targetFreq = new int[26];
        int[] windowFreq = new int[26];
        for (int i = 0; i < target.length(); i++) {
            targetFreq[target.charAt(i) - 'a']++;
        }

        int left = 0;
        for (int right = 0; right < searchString.length(); right++) {
            // 1️⃣ Expand
            windowFreq[searchString.charAt(right) - 'a']++;

            // 2️⃣ When window size reaches k
            if (right - left + 1 == target.length()) {
                // 3️⃣ Record / Evaluate
                if (checkMatch(targetFreq, windowFreq)) {
                    return true;
                }

                // 4️⃣ Slide window
                windowFreq[searchString.charAt(left) - 'a']--;
                left++;
            }
        }
        return false;
    }

    private boolean checkMatch(int[] targetFreq, int[] windowFreq) {
        for (int j = 0; j < 26; j++) {
            if (targetFreq[j] != windowFreq[j]) {
                return false;
            }
        }
        return true;
    }
}