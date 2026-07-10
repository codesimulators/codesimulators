function find132pattern(nums) {
  let s3Value = -Infinity; // @viz: init_s3
  let mStack = []; // @viz: init_stack
  
  for (let i = nums.length - 1; i >= 0; i--) { // @viz: loop
    if (nums[i] < s3Value) { // @viz: check_132
      return true; // @viz: found
    }
    
    while (mStack.length > 0 && nums[i] > mStack[mStack.length - 1]) { // @viz: while_reduction
      s3Value = mStack.pop(); // @viz: update_s3
    }
    
    mStack.push(nums[i]); // @viz: push_s2
  }
  
  return false; // @viz: finish
}