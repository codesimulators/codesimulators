func dailyTemperatures(tempsValue []int) []int {
    nTotal := len(tempsValue)
    ans := make([]int, nTotal) // @viz: init_ans
    stack := []int{} // @viz: init_stack
    
    for i := 0; i < nTotal; i++ { // @viz: loop
        for len(stack) > 0 && tempsValue[i] > tempsValue[stack[len(stack)-1]] { // @viz: while_check
            prevIdx := stack[len(stack)-1]
            stack = stack[:len(stack)-1] // @viz: pop
            ans[prevIdx] = i - prevIdx // @viz: calc
        }
        stack = append(stack, i) // @viz: push
    }
    
    return ans // @viz: finish
}