function nextGreaterElements(nums) {
  const n = nums.length;
  const resultArr = new Array(n).fill(-1); // @viz: init_ans
  const indexStack = []; // @viz: init_stack

  // Simulate circular array by iterating twice
  for (let i = 0; i < 2 * n; i++) { // @viz: loop
    const currentVal = nums[i % n]; // @viz: get_val
    
    while (indexStack.length > 0 && currentVal > nums[indexStack[indexStack.length - 1]]) { // @viz: while_check
      const topIdx = indexStack.pop(); // @viz: pop_idx
      resultArr[topIdx] = currentVal; // @viz: pop_ans
    }
    
    if (i < n) { // @viz: push_check
      indexStack.push(i); // @viz: push
    }
  }

  return resultArr; // @viz: finish
}