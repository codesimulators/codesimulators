class Solution {
    public String removeKdigits(String num, int k) {
        Deque<Character> dq = new ArrayDeque<>(); // @viz: init_stack
        
        for (char digit : num.toCharArray()) { // @viz: loop
            while (k > 0 && !dq.isEmpty() && dq.peekLast() > digit) { // @viz: while_check
                dq.removeLast(); // @viz: pop
                k--; // @viz: dec_k
            }
            dq.addLast(digit); // @viz: push
        }
        
        while (k > 0 && !dq.isEmpty()) { // @viz: trim_check
            dq.removeLast(); // @viz: pop_trim
            k--; // @viz: dec_k_trim
        }
        
        StringBuilder sb = new StringBuilder();
        boolean hasLeading = true;
        for (char d : dq) {
            if (hasLeading && d == '0') continue;
            hasLeading = false;
            sb.append(d);
        }
        
        return sb.length() == 0 ? "0" : sb.toString(); // @viz: finish
    }
}