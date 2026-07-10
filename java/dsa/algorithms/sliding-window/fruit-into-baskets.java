public class FruitBaskets {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int res = 0;

        for (int right = 0; right < fruits.length; right++) {
            // 1️⃣ Expand
            count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);

            // 2️⃣ Condition: while invalid
            while (count.size() > 2) {
                // 3️⃣ Contract
                count.put(fruits[left], count.get(fruits[left]) - 1);
                if (count.get(fruits[left]) == 0) {
                    count.remove(fruits[left]);
                }
                left++;
            }

            // 4️⃣ Record / Optimize
            if (right - left + 1 > res) {
                res = right - left + 1;
            }
        }

        return res;
    }
}