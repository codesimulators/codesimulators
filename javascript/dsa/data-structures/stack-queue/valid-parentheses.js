function isValid(s) {
  const stack = []; // @viz: init_stack
  const mapping = { ")": "(", "}": "{", "]": "[" }; // @viz: init_map

  for (let i = 0; i < s.length; i++) { // @viz: loop
    const char = s[i]; // @viz: char
    
    if (char === "(" || char === "{" || char === "[") { // @viz: check_open
      stack.push(char); // @viz: push
    } else {
      if (stack.length === 0) { // @viz: check_empty
        return false; // @viz: fail_empty
      }
      
      const top = stack.pop(); // @viz: pop
      if (top !== mapping[char]) { // @viz: check_match
        return false; // @viz: fail_match
      }
    }
  }

  return stack.length === 0; // @viz: finish
}