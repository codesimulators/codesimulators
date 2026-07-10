public String minWindow(String s, String t) {
    if (s.length() < t.length()) return "";
    Map<Character, Integer> target = new HashMap<>();
    for (char c : t.toCharArray()) target.put(c, target.getOrDefault(c, 0) + 1);
    
    Map<Character, Integer> window = new HashMap<>();
    int l = 0, count = 0, minLen = Integer.MAX_VALUE, start = 0;
    int required = target.size();
    
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        window.put(c, window.getOrDefault(c, 0) + 1);
        if (target.containsKey(c) && window.get(c).intValue() == target.get(c).intValue()) {
            count++;
        }
        
        while (count == required) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                start = l;
            }
            char left = s.charAt(l);
            window.put(left, window.get(left) - 1);
            if (target.containsKey(left) && window.get(left) < target.get(left)) {
                count--;
            }
            l++;
        }
    }
    return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
}