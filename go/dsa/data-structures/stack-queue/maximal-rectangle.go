func maximalRectangle(matrixData [][]byte) int {
    if len(matrixData) == 0 { return 0 } // @viz: check_empty
    R := len(matrixData) // @viz: init_rows
    C := len(matrixData[0]) // @viz: init_cols
    hArr := make([]int, C) // @viz: init_heights
    maxRes := 0 // @viz: init_max

    for r := 0; r < R; r++ { // @viz: row_loop
        for c := 0; c < C; c++ { // @viz: col_loop
            if matrixData[r][c] == '1' { hArr[c]++ } else { hArr[c] = 0 } // @viz: update_height
        }
        maxRes = max(maxRes, largestHist(hArr)) // @viz: compute_histogram
    }
    return maxRes // @viz: finish
}

func largestHist(hSlice []int) int {
    st := []int{} // @viz: hist_init_stack
    mA := 0 // @viz: hist_init_max
    h := append(hSlice, 0) // @viz: hist_add_sentinel
    
    for i := 0; i < len(h); i++ { // @viz: hist_loop
        for len(st) > 0 && h[i] < h[st[len(st)-1]] { // @viz: hist_while_check
            idx := st[len(st)-1]; st = st[:len(st)-1] // @viz: hist_pop
            w := i // @viz: hist_width
            if len(st) > 0 { w = i - st[len(st)-1] - 1 }
            if h[idx]*w > mA { mA = h[idx] * w } // @viz: hist_update_max
        }
        st = append(st, i) // @viz: hist_push
    }
    return mA // @viz: hist_finish
}