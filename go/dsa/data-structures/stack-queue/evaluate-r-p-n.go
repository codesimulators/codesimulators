func evalRPN(tokensValue []string) int {
    stack := []int{} // @viz: init
    
    for _, t := range tokensValue { // @viz: loop
        val, err := strconv.Atoi(t)
        if err == nil { // @viz: char @viz: check_num
            stack = append(stack, val) // @viz: push
        } else { // @viz: op
            b := stack[len(stack)-1] // @viz: pop_b
            a := stack[len(stack)-2]
            stack = stack[:len(stack)-2] // @viz: pop_a
            
            var res int
            switch t {
                case "+": res = a + b // @viz: calc_add
                case "-": res = a - b // @viz: calc_sub
                case "*": res = a * b // @viz: calc_mul
                case "/": res = a / b // @viz: calc_div
            }
            stack = append(stack, res) // @viz: push_res
        }
    }
    return stack[0] // @viz: finish
}