function removeKdigits(num, k) {
  const stack = []; // @viz: init_stack
  
  for (let digit of num) { // @viz: loop
    while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) { // @viz: while_check
      stack.pop(); // @viz: pop
      k--; // @viz: dec_k
    }
    stack.push(digit); // @viz: push
  }
  
  while (k > 0) { // @viz: trim_check
    stack.pop(); // @viz: pop_trim
    k--; // @viz: dec_k_trim
  }
  
  let res = stack.join("").replace(/^0+/, ""); // @viz: join
  return res === "" ? "0" : res; // @viz: finish
}