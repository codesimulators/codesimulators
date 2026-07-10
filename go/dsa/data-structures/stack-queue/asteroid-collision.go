func asteroidCollision(asteroidsValue []int) []int {
    stack := []int{} // @viz: init_stack
    
    for _, asteroid := range asteroidsValue { // @viz: loop
        isDestroyed := false // @viz: alive
        
        for !isDestroyed && asteroid < 0 && len(stack) > 0 && stack[len(stack)-1] > 0 { // @viz: while_check
            topAsteroid := stack[len(stack)-1] // @viz: get_top
            
            if abs(asteroid) > abs(topAsteroid) { // @viz: check_greater
                stack = stack[:len(stack)-1] // @viz: pop_top
                continue // @viz: continue_loop
            }
            
            if abs(asteroid) == abs(topAsteroid) { // @viz: check_equal
                stack = stack[:len(stack)-1] // @viz: both_pop_top
            }
            
            isDestroyed = true // @viz: ast_destroyed
        }
        
        if !isDestroyed { // @viz: check_alive
            stack = append(stack, asteroid) // @viz: push_ast
        }
    }
    
    return stack // @viz: finish
}

func abs(x int) int { if x < 0 { return -x }; return x }