def asteroidCollision(asteroidsValue: List[int]) -> List[int]:
    stack = [] # @viz: init_stack
    
    for asteroid in asteroidsValue: # @viz: loop
        isDestroyed = False # @viz: alive
        
        while not isDestroyed and asteroid < 0 and stack and stack[-1] > 0: # @viz: while_check
            topAsteroid = stack[-1] # @viz: get_top
            
            if abs(asteroid) > abs(topAsteroid): # @viz: check_greater
                stack.pop() # @viz: pop_top
                continue # @viz: continue_loop
                
            if abs(asteroid) == abs(topAsteroid): # @viz: check_equal
                stack.pop() # @viz: both_pop_top
                
            isDestroyed = True # @viz: ast_destroyed
        
        if not isDestroyed: # @viz: check_alive
            stack.append(asteroid) # @viz: push_ast
            
    return stack # @viz: finish