def decodeString(sValue: str) -> str:
    countStack = [] # @viz: init_counts
    resStack = [] # @viz: init_res_stack
    currentRes = "" # @viz: init_res
    k = 0 # @viz: init_k
    
    for char in sValue: # @viz: loop
        if char.isdigit(): # @viz: process_char @viz: check_digit
            k = k * 10 + int(char) # @viz: build_k
        elif char == "[": # @viz: check_open
            countStack.append(k) # @viz: push_k
            resStack.append(currentRes) # @viz: push_res
            currentRes = "" # @viz: reset_res
            k = 0 # @viz: reset_k
        elif char == "]": # @viz: check_close
            prevRes = resStack.pop() # @viz: pop_res
            repeatCount = countStack.pop() # @viz: pop_k
            currentRes = prevRes + currentRes * repeatCount # @viz: repeat_loop @viz: append @viz: update_res
        else: # @viz: char
            currentRes += char # @viz: append_char
            
    return currentRes # @viz: finish