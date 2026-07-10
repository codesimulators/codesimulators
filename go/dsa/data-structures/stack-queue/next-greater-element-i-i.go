func nextGreaterElements(values []int) []int {
    length := len(values)
    ansArray := make([]int, length)
    for i := range ansArray { ansArray[i] = -1 } // @viz: init_ans
    indexStack := []int{} // @viz: init_stack
    
    for i := 0; i < 2 * length; i++ { // @viz: loop
        current := values[i % length] // @viz: get_val
        for len(indexStack) > 0 && current > values[indexStack[len(indexStack)-1]] { // @viz: while_check
            topIdx := indexStack[len(indexStack)-1] // @viz: pop_idx
            ansArray[topIdx] = current // @viz: pop_ans
            indexStack = indexStack[:len(indexStack)-1]
        }
        if i < length { // @viz: push_check
            indexStack = append(indexStack, i) // @viz: push
        }
    }
    
    return ansArray // @viz: finish
}