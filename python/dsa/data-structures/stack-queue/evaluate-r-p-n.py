def evalRPN(tokensValue: List[str]) -> int:
    stack = [] # @viz: init
    
    for token in tokensValue: # @viz: loop
        if token not in "+-*/": # @viz: char @viz: check_num
            stack.append(int(token)) # @viz: push
        else: # @viz: op
            b = stack.pop() # @viz: pop_b
            a = stack.pop() # @viz: pop_a
            if token == "+":
                res = a + b # @viz: calc_add
            elif token == "-":
                res = a - b # @viz: calc_sub
            elif token == "*":
                res = a * b # @viz: calc_mul
            else:
                res = int(a / b) # @viz: calc_div
            
            stack.append(res) # @viz: push_res
            
    return stack.pop() # @viz: finish