function asteroidCollision(asteroids) {
  const stack = []; // @viz: init_stack

  for (const asteroid of asteroids) { // @viz: loop
    let isDestroyed = false; // @viz: alive
    
    while (!isDestroyed && asteroid < 0 && stack.length > 0 && stack[stack.length - 1] > 0) { // @viz: while_check
      const topAsteroid = stack[stack.length - 1]; // @viz: get_top
      
      if (Math.abs(asteroid) > Math.abs(topAsteroid)) { // @viz: check_greater
        stack.pop(); // @viz: pop_top
        continue; // @viz: continue_loop
      } 
      
      if (Math.abs(asteroid) === Math.abs(topAsteroid)) { // @viz: check_equal
        stack.pop(); // @viz: both_pop_top
      }
      
      isDestroyed = true; // @viz: ast_destroyed
    }
    
    if (!isDestroyed) { // @viz: check_alive
      stack.push(asteroid); // @viz: push_ast
    }
  }

  return stack; // @viz: finish
}