class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            // 1️⃣ Compare: Do characters match?
            if (s.charAt(i) == t.charAt(j)) {
                // 2️⃣ Match! Consume from subsequence
                i++;
            }
            // 3️⃣ Always advance through main string
            j++;
        }
        return i == s.length();
    }
}