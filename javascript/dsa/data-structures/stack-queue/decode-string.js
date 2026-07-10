function decodeString(s) {
  const countStack = []; // @viz: init_counts
  const resStack = []; // @viz: init_res_stack
  let currentRes = ""; // @viz: init_res
  let k = 0; // @viz: init_k

  for (const char of s) { // @viz: loop
    if (!isNaN(char)) { // @viz: process_char @viz: check_digit
      k = k * 10 + Number(char); // @viz: build_k
    } else if (char === "[") { // @viz: check_open
      countStack.push(k); // @viz: push_k
      resStack.push(currentRes); // @viz: push_res
      currentRes = ""; // @viz: reset_res
      k = 0; // @viz: reset_k
    } else if (char === "]") { // @viz: check_close
      const prevRes = resStack.pop(); // @viz: pop_res
      const repeatCount = countStack.pop(); // @viz: pop_k
      let decoded = prevRes; // @viz: init_temp
      for (let i = 0; i < repeatCount; i++) { // @viz: repeat_loop
        decoded += currentRes; // @viz: append
      }
      currentRes = decoded; // @viz: update_res
    } else { // @viz: char
      currentRes += char; // @viz: append_char
    }
  }

  return currentRes; // @viz: finish
}