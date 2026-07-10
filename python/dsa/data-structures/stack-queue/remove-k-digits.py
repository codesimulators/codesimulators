def removeKdigits(numbers: str, kTotal: int) -> str:
    resStack = [] # @viz: init_stack
    
    for digit in numbers: # @viz: loop
        while kTotal > 0 and resStack and resStack[-1] > digit: # @viz: while_check
            resStack.pop() # @viz: pop
            kTotal -= 1 # @viz: dec_k
        resStack.append(digit) # @viz: push
        
    while kTotal > 0 and resStack: # @viz: trim_check
        resStack.pop() # @viz: pop_trim
        kTotal -= 1 # @viz: dec_k_trim

    resStr = "".join(resStack).lstrip('0') # @viz: join
    return resStr if resStr else "0" # @viz: finish