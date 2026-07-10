public class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";

        Map<Character, Integer> targetFreq = new HashMap<>();
        for (char c : t.toCharArray()) {
            targetFreq.put(c, targetFreq.getOrDefault(c, 0) + 1);
        }

        int requiredMatches = targetFreq.size();
        Map<Character, Integer> windowFreq = new HashMap<>();
        int left = 0, matchCount = 0;
        int minLength = Integer.MAX_VALUE, bestStart = 0;

        for (int right = 0; right < s.length(); right++) {
            // 1️⃣ Expand
            char c = s.charAt(right);
            if (targetFreq.containsKey(c)) {
                windowFreq.put(c, windowFreq.getOrDefault(c, 0) + 1);
                if (windowFreq.get(c).equals(targetFreq.get(c))) {
                    matchCount++;
                }
            }

            // 2️⃣ Condition: while valid
            while (matchCount == requiredMatches) {
                // 4️⃣ Record / Optimize
                if (right - left + 1 < minLength) {
                    minLength = right - left + 1;
                    bestStart = left;
                }

                // 3️⃣ Contract
                char leftChar = s.charAt(left);
                if (targetFreq.containsKey(leftChar)) {
                    if (windowFreq.get(leftChar).equals(targetFreq.get(leftChar))) {
                        matchCount--;
                    }
                    windowFreq.put(leftChar, windowFreq.get(leftChar) - 1);
                }
                left++;
            }
        }

        return minLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + minLength);
    }
}