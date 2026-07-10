class Solution {
    public int findCelebrity(int[][] M) {
        int n = M.length;
        Stack<Integer> st = new Stack<>(); // @viz: init_stack
        for (int personIdx = 0; personIdx < n; personIdx++) { // @viz: push_loop
            st.push(personIdx); // @viz: push_all
        }
        
        while (st.size() > 1) { // @viz: while_reduction
            int first = st.pop(); // @viz: pop_a
            int second = st.pop(); // @viz: pop_b
            
            if (knows(M, first, second)) { // @viz: check_knows
                st.push(second); // @viz: push_b_back
            } else {
                st.push(first); // @viz: push_a_back
            }
        }
        
        int celebrity = st.pop(); // @viz: extract_candidate
        for (int otherPerson = 0; otherPerson < n; otherPerson++) { // @viz: verify_loop
            if (otherPerson != celebrity && (knows(M, celebrity, otherPerson) || !knows(M, otherPerson, celebrity))) { // @viz: verify_check
                return -1; // @viz: verify_fail
            }
        }
        return celebrity; // @viz: finish
    }

    private boolean knows(int[][] M, int a, int b) {
        return M[a][b] == 1;
    }
}