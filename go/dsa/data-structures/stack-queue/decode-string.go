func decodeString(sValue string) string {
    countStack := []int{} // @viz: init_counts
    resStack := []string{} // @viz: init_res_stack
    currentRes := "" // @viz: init_res
    k := 0 // @viz: init_k
    
    for _, char := range sValue { // @viz: loop
        if unicode.IsDigit(rune(char)) { // @viz: process_char @viz: check_digit
            k = k*10 + int(char-'0') // @viz: build_k
        } else if char == '[' { // @viz: check_open
            countStack = append(countStack, k) // @viz: push_k
            resStack = append(resStack, currentRes) // @viz: push_res
            currentRes = "" // @viz: reset_res
            k = 0 // @viz: reset_k
        } else if char == ']' { // @viz: check_close
            prevRes := resStack[len(resStack)-1] // @viz: pop_res
            repeatCount := countStack[len(countStack)-1] // @viz: pop_k
            resStack = resStack[:len(resStack)-1]
            countStack = countStack[:len(countStack)-1]
            temp := prevRes // @viz: init_temp
            for i := 0; i < repeatCount; i++ { // @viz: repeat_loop
                temp += currentRes // @viz: append
            }
            currentRes = temp // @viz: update_res
        } else { // @viz: char
            currentRes += string(char) // @viz: append_char
        }
    }
    return currentRes // @viz: finish
}