function evalRPN(tokens) {
  const stack = []; // @viz: init
  
  for (const token of tokens) { // @viz: loop
    const val = Number(token); // @viz: char
    
    if (!isNaN(val)) { // @viz: check_num
      stack.push(val); // @viz: push
    } else { // @viz: op
      const b = stack.pop(); // @viz: pop_b
      const a = stack.pop(); // @viz: pop_a
      
      let result;
      if (token === "+") {
        result = a + b; // @viz: calc_add
      } else if (token === "-") {
        result = a - b; // @viz: calc_sub
      } else if (token === "*") {
        result = a * b; // @viz: calc_mul
      } else if (token === "/") {
        result = Math.trunc(a / b); // @viz: calc_div
      }
      
      stack.push(result); // @viz: push_res
    }
  }
  const finalResult = stack.pop(); // @viz: finish
  return finalResult;
}