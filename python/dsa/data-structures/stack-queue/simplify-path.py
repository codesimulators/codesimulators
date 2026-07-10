def simplifyPath(pathString: str) -> str:
    stack = [] # @viz: init
    parts = pathString.split("/") # @viz: split
    
    for part in parts: # @viz: loop
        if part == "." or not part: # @viz: check_skip
            continue # @viz: skip
            
        if part == "..": # @viz: check_parent
            if stack: # @viz: check_pop
                stack.pop() # @viz: pop
        else:
            stack.append(part) # @viz: push
            
    return "/" + "/".join(stack) # @viz: finish