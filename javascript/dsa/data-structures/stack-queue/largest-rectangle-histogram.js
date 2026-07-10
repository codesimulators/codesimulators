function largestRectangleArea(heights) {
  let mStack = []; // @viz: init_stack
  let maxArea = 0; // @viz: init_max
  let h = [...heights, 0]; // @viz: add_sentinel
  
  for (let i = 0; i < h.length; i++) { // @viz: loop
    while (mStack.length > 0 && h[i] < h[mStack[mStack.length - 1]]) { // @viz: while_check
      let height = h[mStack.pop()]; // @viz: pop
      let width = mStack.length === 0 ? i : i - mStack[mStack.length - 1] - 1; // @viz: width
      maxArea = Math.max(maxArea, height * width); // @viz: update_max
    }
    mStack.push(i); // @viz: push
  }
  return maxArea; // @viz: finish
}