function findCelebrity(M) {
  const n = M.length;
  function knows(a, b) {
    return M[a][b] === 1;
  }

  let stack = []; // @viz: init_stack
  for (let personIdx = 0; personIdx < n; personIdx++) { // @viz: push_loop
    stack.push(personIdx); // @viz: push_all
  }
  
  while (stack.length > 1) { // @viz: while_reduction
    let A = stack.pop(); // @viz: pop_a
    let B = stack.pop(); // @viz: pop_b
    
    if (knows(A, B)) { // @viz: check_knows
      stack.push(B); // @viz: push_b_back
    } else {
      stack.push(A); // @viz: push_a_back
    }
  }
  
  let candidate = stack.pop(); // @viz: extract_candidate
  for (let otherPerson = 0; otherPerson < n; otherPerson++) { // @viz: verify_loop
    if (otherPerson !== candidate && (knows(candidate, otherPerson) || !knows(otherPerson, candidate))) { // @viz: verify_check
      return -1; // @viz: verify_fail
    }
  }
  return candidate; // @viz: finish
}