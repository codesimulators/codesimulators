class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> stack = new Stack<>(); // @viz: init_stack
        
        for (int asteroid : asteroids) { // @viz: loop
            boolean isDestroyed = false; // @viz: alive
            
            while (!isDestroyed && asteroid < 0 && !stack.isEmpty() && stack.peek() > 0) { // @viz: while_check
                int topAsteroid = stack.peek(); // @viz: get_top
                
                if (Math.abs(asteroid) > Math.abs(topAsteroid)) { // @viz: check_greater
                    stack.pop(); // @viz: pop_top
                    continue; // @viz: continue_loop
                }
                
                if (Math.abs(asteroid) == Math.abs(topAsteroid)) { // @viz: check_equal
                    stack.pop(); // @viz: both_pop_top
                }
                
                isDestroyed = true; // @viz: ast_destroyed
            }
            
            if (!isDestroyed) { // @viz: check_alive
                stack.push(asteroid); // @viz: push_ast
            }
        }
        
        return stack.stream().mapToInt(i -> i).toArray(); // @viz: finish
    }
}