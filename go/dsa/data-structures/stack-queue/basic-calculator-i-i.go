func calculate(sValue string) int {
    stack := []int{} // @viz: init
    num := 0 // @viz: init_num
    sign := byte('+') // @viz: init_sign
    
    for i := 0; i < len(sValue); i++ { // @viz: loop
        char := sValue[i]
        
        if char >= '0' && char <= '9' { // @viz: check_digit
            num = num*10 + int(char-'0') // @viz: build_num
        }
        
        if (char < '0' || char > '9') && char != ' ' || i == len(sValue)-1 { // @viz: check_op
            if sign == '+' { // @viz: check_pos
                stack = append(stack, num) // @viz: push_pos
            } else if sign == '-' { // @viz: check_neg
                stack = append(stack, -num) // @viz: push_neg
            } else if sign == '*' { // @viz: check_mul
                last := stack[len(stack)-1]
                stack[len(stack)-1] = last * num // @viz: push_mul
            } else if sign == '/' { // @viz: check_div
                last := stack[len(stack)-1]
                stack[len(stack)-1] = last / num // @viz: push_div
            }
            sign = char // @viz: update_sign
            num = 0 // @viz: reset_num
        }
    }
    
    result := 0
    for _, v := range stack {
        result += v
    }
    return result // @viz: finish
}