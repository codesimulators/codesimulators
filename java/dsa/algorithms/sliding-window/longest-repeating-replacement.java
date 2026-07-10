public class LongestRepeating {
    public int characterReplacement(String s, int k) {
        int[] frequencyMap = new int[26];
        int maxFrequency = 0;
        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            // 1️⃣ Expand
            int charIndex = s.charAt(right) - 'A';
            frequencyMap[charIndex]++;
            if (frequencyMap[charIndex] > maxFrequency) {
                maxFrequency = frequencyMap[charIndex];
            }

            // 2️⃣ Condition: while invalid
            while (right - left + 1 - maxFrequency > k) {
                // 3️⃣ Contract
                int leftCharIndex = s.charAt(left) - 'A';
                frequencyMap[leftCharIndex]--;
                left++;
            }

            // 4️⃣ Record / Optimize
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
            }
        }

        return maxLength;
    }
}