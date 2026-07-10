func isValid(s string) bool {
    stack := []rune{} // @viz: init_stack
    pairs := map[rune]rune{')': '(', '}': '{', ']': '['} // @viz: init_map
    
    for _, char := range s { // @viz: loop @viz: char
        if char == '(' || char == '{' || char == '[' { // @viz: check_open
            stack = append(stack, char) // @viz: push
        } else {
            if len(stack) == 0 { // @viz: check_empty
                return false // @viz: fail_empty
            }
            
            top := stack[len(stack)-1] // @viz: pop
            stack = stack[:len(stack)-1]
            
            if top != pairs[char] { // @viz: check_match
                return false // @viz: fail_match
            }
        }
    }
    return len(stack) == 0 // @viz: finish
}