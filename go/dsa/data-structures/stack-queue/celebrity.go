func findCelebrity(M [][]int) int {
    nValue := len(M)

    peopleStack := []int{} // @viz: init_stack
    for personIdx := 0; personIdx < nValue; personIdx++ { // @viz: push_loop
        peopleStack = append(peopleStack, personIdx) // @viz: push_all
    }
    
    for len(peopleStack) > 1 { // @viz: while_reduction
        A := peopleStack[len(peopleStack)-1]; peopleStack = peopleStack[:len(peopleStack)-1] // @viz: pop_a
        B := peopleStack[len(peopleStack)-1]; peopleStack = peopleStack[:len(peopleStack)-1] // @viz: pop_b
        
        if knows(M, A, B) { // @viz: check_knows
            peopleStack = append(peopleStack, B) // @viz: push_b_back
        } else {
            peopleStack = append(peopleStack, A) // @viz: push_a_back
        }
    }
    
    cand := peopleStack[0] // @viz: extract_candidate
    for otherPerson := 0; otherPerson < nValue; otherPerson++ { // @viz: verify_loop
        if otherPerson != cand && (knows(M, cand, otherPerson) || !knows(M, otherPerson, cand)) { // @viz: verify_check
            return -1 // @viz: verify_fail
        }
    }
    return cand // @viz: finish
}

func knows(M [][]int, a, b int) bool {
    return M[a][b] == 1
}
