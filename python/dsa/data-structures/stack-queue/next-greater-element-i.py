def nextGreaterElement(n1: List[int], n2: List[int]) -> List[int]:
    nxtGreaterMap = {} # @viz: init_map
    decreStack = [] # @viz: init_stack
    
    for x in n2: # @viz: loop
        while decreStack and x > decreStack[-1]: # @viz: while_check
            nxtGreaterMap[decreStack.pop()] = x # @viz: map_set
        decreStack.append(x) # @viz: push
        
    return [nxtGreaterMap.get(n, -1) for n in n1] # @viz: finish