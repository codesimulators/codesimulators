public String frequencySort(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    
    int n = s.length();
    List<Character>[] buckets = new List[n + 1];
    for (char c : counts.keySet()) {
        int freq = counts.get(c);
        if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
        buckets[freq].add(c);
    }
    
    StringBuilder res = new StringBuilder();
    for (int f = n; f >= 1; f--) {
        if (buckets[f] != null) {
            for (char c : buckets[f]) {
                for (int i = 0; i < f; i++) res.append(c);
            }
        }
    }
    return res.toString();
}