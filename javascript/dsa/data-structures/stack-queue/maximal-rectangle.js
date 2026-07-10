function maximalRectangle(matrix) {
  if (matrix.length === 0) return 0; // @viz: check_empty
  const rows = matrix.length; // @viz: init_rows
  const cols = matrix[0].length; // @viz: init_cols
  const heights = new Array(cols).fill(0); // @viz: init_heights
  let globalMaxArea = 0; // @viz: init_max

  for (let r = 0; r < rows; r++) { // @viz: row_loop
    for (let c = 0; c < cols; c++) { // @viz: col_loop
      heights[c] = matrix[r][c] === '1' ? heights[c] + 1 : 0; // @viz: update_height
    }
    
    globalMaxArea = Math.max(globalMaxArea, largestRectangleArea(heights)); // @viz: compute_histogram
  }
  return globalMaxArea; // @viz: finish
}

function largestRectangleArea(hValues) {
  let mStack = []; // @viz: hist_init_stack
  let localMax = 0; // @viz: hist_init_max
  let h = [...hValues, 0]; // @viz: hist_add_sentinel
  
  for (let i = 0; i < h.length; i++) { // @viz: hist_loop
    while (mStack.length > 0 && h[i] < h[mStack[mStack.length - 1]]) { // @viz: hist_while_check
      let height = h[mStack.pop()]; // @viz: hist_pop
      let width = mStack.length === 0 ? i : i - mStack[mStack.length - 1] - 1; // @viz: hist_width
      localMax = Math.max(localMax, height * width); // @viz: hist_update_max
    }
    mStack.push(i); // @viz: hist_push
  }
  return localMax; // @viz: hist_finish
}