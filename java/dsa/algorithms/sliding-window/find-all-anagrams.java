public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (s.length() < p.length()) return result;

        int[] pCount = new int[26];
        int[] sCount = new int[26];
        for (int i = 0; i < p.length(); i++) {
            pCount[p.charAt(i) - 'a']++;
        }

        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            // 1️⃣ Expand
            sCount[s.charAt(right) - 'a']++;

            // 2️⃣ When window size reaches k
            if (right - left + 1 == p.length()) {
                // 3️⃣ Record / Evaluate
                if (Arrays.equals(pCount, sCount)) {
                    result.add(left);
                }

                // 4️⃣ Slide window
                sCount[s.charAt(left) - 'a']--;
                left++;
            }
        }
        return result;
    }
}