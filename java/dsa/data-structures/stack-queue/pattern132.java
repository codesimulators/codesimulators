public boolean find132pattern(int[] arr) {
    int s3 = Integer.MIN_VALUE; // @viz: init_s3
    Stack<Integer> st = new Stack<>(); // @viz: init_stack
    
    for (int i = arr.length - 1; i >= 0; i--) { // @viz: loop
        if (arr[i] < s3) { // @viz: check_132
            return true; // @viz: found
        }
        
        while (!st.isEmpty() && arr[i] > st.peek()) { // @viz: while_reduction
            s3 = st.pop(); // @viz: update_s3
        }
        
        st.push(arr[i]); // @viz: push_s2
    }
    
    return false; // @viz: finish
}