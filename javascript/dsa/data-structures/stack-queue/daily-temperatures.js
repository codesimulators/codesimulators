function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0); // @viz: init_ans
  const stack = []; // @viz: init_stack

  for (let i = 0; i < n; i++) { // @viz: loop
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) { // @viz: while_check
      const prevIndex = stack.pop(); // @viz: pop
      ans[prevIndex] = i - prevIndex; // @viz: calc
    }
    stack.push(i); // @viz: push
  }

  return ans; // @viz: finish
}