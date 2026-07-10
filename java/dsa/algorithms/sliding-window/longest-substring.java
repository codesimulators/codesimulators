public class LongestSubstring {
    public int findLength(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            // 1️⃣ Expand
            char c = s.charAt(right);

            // 2️⃣ Condition: Check for duplicates
            if (map.containsKey(c)) {
                // 3️⃣ Contract: Jump left pointer
                if (map.get(c) + 1 > left) {
                    left = map.get(c) + 1;
                }
            }

            // 4️⃣ Record / Optimize
            map.put(c, right);
            if (right - left + 1 > maxLen) {
                maxLen = right - left + 1;
            }
        }

        return maxLen;
    }
}