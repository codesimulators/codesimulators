def dailyTemperatures(temps: List[int]) -> List[int]:
    nValue = len(temps)
    ans = [0] * nValue # @viz: init_ans
    stackIndices = [] # @viz: init_stack
    
    for i in range(nValue): # @viz: loop
        while stackIndices and temps[i] > temps[stackIndices[-1]]: # @viz: while_check
            prev_idx = stackIndices.pop() # @viz: pop
            ans[prev_idx] = i - prev_idx # @viz: calc
        stackIndices.append(i) # @viz: push
        
    return ans # @viz: finish