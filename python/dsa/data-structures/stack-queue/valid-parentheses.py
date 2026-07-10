def isValid(s: str) -> bool:
    stack = [] # @viz: init_stack
    mapping = {")": "(", "}": "{", "]": "["} # @viz: init_map
    
    for char in s: # @viz: loop @viz: char
        if char in mapping.values(): # @viz: check_open
            stack.append(char) # @viz: push
        else:
            if not stack: # @viz: check_empty
                return False # @viz: fail_empty
            
            top = stack.pop() # @viz: pop
            if mapping[char] != top: # @viz: check_match
                return False # @viz: fail_match
                
    return not stack # @viz: finish