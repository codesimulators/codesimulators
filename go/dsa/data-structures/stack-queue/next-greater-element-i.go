func nextGreaterElement(n1 []int, n2 []int) []int {
    greaterMap := make(map[int]int) // @viz: init_map
    mStack := []int{} // @viz: init_stack
    
    for _, num := range n2 { // @viz: loop
        for len(mStack) > 0 && num > mStack[len(mStack)-1] { // @viz: while_check
            top := mStack[len(mStack)-1] // @viz: map_set
            greaterMap[top] = num
            mStack = mStack[:len(mStack)-1]
        }
        mStack = append(mStack, num) // @viz: push
    }
    
    finalRes := make([]int, len(n1))
    for i, v := range n1 {
        if res, exists := greaterMap[v]; exists {
            finalRes[i] = res
        } else {
            finalRes[i] = -1
        }
    }
    return finalRes // @viz: finish
}