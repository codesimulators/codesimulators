public int maximalRectangle(char[][] matrix) {
    if (matrix.length == 0) return 0; // @viz: check_empty
    int R = matrix.length; // @viz: init_rows
    int C = matrix[0].length; // @viz: init_cols
    int[] hArr = new int[C]; // @viz: init_heights
    int totalMax = 0; // @viz: init_max

    for (int r = 0; r < R; r++) { // @viz: row_loop
        for (int c = 0; c < C; c++) { // @viz: col_loop
            hArr[c] = matrix[r][c] == '1' ? hArr[c] + 1 : 0; // @viz: update_height
        }
        totalMax = Math.max(totalMax, largestHist(hArr)); // @viz: compute_histogram
    }
    return totalMax; // @viz: finish
}

private int largestHist(int[] rowHeights) {
    Stack<Integer> st = new Stack<>(); // @viz: hist_init_stack
    int maxA = 0; // @viz: hist_init_max
    int[] aux = Arrays.copyOf(rowHeights, rowHeights.length + 1); // @viz: hist_add_sentinel
    
    for (int i = 0; i < aux.length; i++) { // @viz: hist_loop
        while (!st.isEmpty() && aux[i] < aux[st.peek()]) { // @viz: hist_while_check
            int h = aux[st.pop()]; // @viz: hist_pop
            int w = st.isEmpty() ? i : i - st.peek() - 1; // @viz: hist_width
            maxA = Math.max(maxA, h * w); // @viz: hist_update_max
        }
        st.push(i); // @viz: hist_push
    }
    return maxA; // @viz: hist_finish
}