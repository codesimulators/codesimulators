def findCelebrity(M):
    nValue = len(M)
    def knows(a, b):
        return M[a][b] == 1

    resStack = [] # @viz: init_stack
    for personIdx in range(nValue): # @viz: push_loop
        resStack.append(personIdx) # @viz: push_all
    
    while len(resStack) > 1: # @viz: while_reduction
        personA = resStack.pop() # @viz: pop_a
        personB = resStack.pop() # @viz: pop_b
        
        if knows(personA, personB): # @viz: check_knows
            resStack.append(personB) # @viz: push_b_back
        else:
            resStack.append(personA) # @viz: push_a_back
            
    finalCandidate = resStack.pop() # @viz: extract_candidate
    for otherPerson in range(nValue): # @viz: verify_loop
        if otherPerson != finalCandidate and (knows(finalCandidate, otherPerson) or not knows(otherPerson, finalCandidate)): # @viz: verify_check
            return -1 # @viz: verify_fail
            
    return finalCandidate # @viz: finish