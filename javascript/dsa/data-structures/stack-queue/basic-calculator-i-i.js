function calculate(s) {
  const stack = []; // @viz: init
  let currentNum = 0; // @viz: init_num
  let lastSign = "+"; // @viz: init_sign

  for (let i = 0; i < s.length; i++) { // @viz: loop
    const char = s[i];
    
    if (char >= "0" && char <= "9") { // @viz: check_digit
      currentNum = currentNum * 10 + Number(char); // @viz: build_num
    }
    
    if ((isNaN(parseInt(char)) && char !== " ") || i === s.length - 1) { // @viz: check_op
      if (lastSign === "+") { // @viz: check_pos
        stack.push(currentNum); // @viz: push_pos
      } else if (lastSign === "-") { // @viz: check_neg
        stack.push(-currentNum); // @viz: push_neg
      } else if (lastSign === "*") { // @viz: check_mul
        stack.push(stack.pop() * currentNum); // @viz: push_mul
      } else if (lastSign === "/") { // @viz: check_div
        stack.push(Math.trunc(stack.pop() / currentNum)); // @viz: push_div
      }

      lastSign = char; // @viz: update_sign
      currentNum = 0; // @viz: reset_num
    }
  }

  const result = stack.reduce((a, b) => a + b, 0); // @viz: finish
  return result;
}