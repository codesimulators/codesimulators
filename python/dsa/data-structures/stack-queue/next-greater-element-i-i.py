def nextGreaterElements(numsList: List[int]) -> List[int]:
    listLen = len(numsList)
    answers = [-1] * listLen # @viz: init_ans
    s = [] # @viz: init_stack
    
    for i in range(2 * listLen): # @viz: loop
        currNum = numsList[i % listLen] # @viz: get_val
        while s and currNum > numsList[s[-1]]: # @viz: while_check
            idx = s.pop() # @viz: pop_idx
            answers[idx] = currNum # @viz: pop_ans
            
        if i < listLen: # @viz: push_check
            s.append(i) # @viz: push
            
    return answers # @viz: finish