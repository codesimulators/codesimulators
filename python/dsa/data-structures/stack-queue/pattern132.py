def find132pattern(numbers):
    s3Val = float('-inf') # @viz: init_s3
    monoStack = [] # @viz: init_stack
    
    for i in range(len(numbers) - 1, -1, -1): # @viz: loop
        if numbers[i] < s3Val: # @viz: check_132
            return True # @viz: found
        
        while monoStack and numbers[i] > monoStack[-1]: # @viz: while_reduction
            s3Val = monoStack.pop() # @viz: update_s3
            
        monoStack.append(numbers[i]) # @viz: push_s2
        
    return False # @viz: finish