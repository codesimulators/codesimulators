def calculate(sValue: str) -> int:
    stack = [] # @viz: init
    num = 0 # @viz: init_num
    sign = "+" # @viz: init_sign
    
    for i in range(len(sValue)): # @viz: loop
        char = sValue[i]
        
        if char.isdigit(): # @viz: check_digit
            num = num * 10 + int(char) # @viz: build_num
            
        if (not char.isdigit() and char != " ") or i == len(sValue) - 1: # @viz: check_op
            if sign == "+": # @viz: check_pos
                stack.append(num) # @viz: push_pos
            elif sign == "-": # @viz: check_neg
                stack.append(-num) # @viz: push_neg
            elif sign == "*": # @viz: check_mul
                stack.append(stack.pop() * num) # @viz: push_mul
            elif sign == "/": # @viz: check_div
                stack.append(int(stack.pop() / num)) # @viz: push_div
            
            sign = char # @viz: update_sign
            num = 0 # @viz: reset_num
            
    return sum(stack) # @viz: finish