class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> st = new Stack<>(); // @viz: init_stack
        int maxArea = 0; // @viz: init_max
        int[] h = Arrays.copyOf(heights, heights.length + 1); // @viz: add_sentinel
        
        for (int i = 0; i < h.length; i++) { // @viz: loop
            while (!st.isEmpty() && h[i] < h[st.peek()]) { // @viz: while_check
                int height = h[st.pop()]; // @viz: pop
                int width = st.isEmpty() ? i : i - st.peek() - 1; // @viz: width
                maxArea = Math.max(maxArea, height * width); // @viz: update_max
            }
            st.push(i); // @viz: push
        }
        return maxArea; // @viz: finish
    }
}