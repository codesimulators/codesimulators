func largestRectangleArea(heights []int) int {
    st := []int{} // @viz: init_stack
    maxArea := 0 // @viz: init_max
    h := append(heights, 0) // @viz: add_sentinel
    
    for i := 0; i < len(h); i++ { // @viz: loop
        for len(st) > 0 && h[i] < h[st[len(st)-1]] { // @viz: while_check
            idx := st[len(st)-1]
            st = st[:len(st)-1] // @viz: pop
            
            width := i // @viz: width
            if len(st) > 0 { width = i - st[len(st)-1] - 1 }
            
            if h[idx]*width > maxArea { maxArea = h[idx] * width } // @viz: update_max
        }
        st = append(st, i) // @viz: push
    }
    return maxArea // @viz: finish
}