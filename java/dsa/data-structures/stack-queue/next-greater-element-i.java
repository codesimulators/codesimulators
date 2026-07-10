class Solution {
    public int[] nextGreaterElement(int[] n1, int[] n2) {
        Map<Integer, Integer> map = new HashMap<>(); // @viz: init_map
        Stack<Integer> st = new Stack<>(); // @viz: init_stack
        
        for (int val : n2) { // @viz: loop
            while (!st.isEmpty() && val > st.peek()) { // @viz: while_check
                map.put(st.pop(), val); // @viz: map_set
            }
            st.push(val); // @viz: push
        }
        
        int[] res = new int[n1.length];
        for (int i = 0; i < n1.length; i++) {
            res[i] = map.getOrDefault(n1[i], -1);
        }
        return res; // @viz: finish
    }
}