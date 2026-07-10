class Solution {
    public int[] nextGreaterElements(int[] nArr) {
        int n = nArr.length;
        int[] results = new int[n];
        Arrays.fill(results, -1); // @viz: init_ans
        Stack<Integer> st = new Stack<>(); // @viz: init_stack
        
        for (int i = 0; i < 2 * n; i++) { // @viz: loop
            int val = nArr[i % n]; // @viz: get_val
            while (!st.isEmpty() && val > nArr[st.peek()]) { // @viz: while_check
                results[st.pop()] = val; // @viz: pop_ans
            }
            if (i < n) { // @viz: push_check
                st.push(i); // @viz: push
            }
        }
        
        return results; // @viz: finish
    }
}