function sumSubarrayMins(arr) {
  const n = arr.length;
  const ple = new Array(n).fill(-1); // @viz: init_ple
  const nle = new Array(n).fill(n);  // @viz: init_nle
  let stack = [];                    // @viz: init_stack

  // Find Previous Less Element
  for (let i = 0; i < n; i++) { // @viz: loop_ple
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) { // @viz: while_ple
      stack.pop(); // @viz: pop_ple
    }
    if (stack.length > 0) { // @viz: if_ple
      ple[i] = stack[stack.length - 1]; // @viz: set_ple
    }
    stack.push(i); // @viz: push_ple
  }

  stack = []; // @viz: reset_stack
  // Find Next Less Element
  for (let i = n - 1; i >= 0; i--) { // @viz: loop_nle
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) { // @viz: while_nle
      stack.pop(); // @viz: pop_nle
    }
    if (stack.length > 0) { // @viz: if_nle
      nle[i] = stack[stack.length - 1]; // @viz: set_nle
    }
    stack.push(i); // @viz: push_nle
  }

  let sum = 0;
  const MOD = 1e9 + 7;
  for (let i = 0; i < n; i++) { // @viz: loop_sum
    const left = i - ple[i];
    const right = nle[i] - i;
    sum = (sum + arr[i] * left * right) % MOD; // @viz: calc_sum
  }
  return sum; // @viz: finish
}