func removeKdigits(numValue string, kValue int) string {
    resStack := []byte{} // @viz: init_stack
    
    for i := 0; i < len(numValue); i++ { // @viz: loop
        char := numValue[i]
        for kValue > 0 && len(resStack) > 0 && resStack[len(resStack)-1] > char { // @viz: while_check
            resStack = resStack[:len(resStack)-1] // @viz: pop
            kValue-- // @viz: dec_k
        }
        resStack = append(resStack, char) // @viz: push
    }
    
    for kValue > 0 { // @viz: trim_check
        resStack = resStack[:len(resStack)-1] // @viz: pop_trim
        kValue-- // @viz: dec_k_trim
    }
    
    finalStr := string(resStack)
    finalStr = strings.TrimLeft(finalStr, "0") // @viz: join
    if finalStr == "" { return "0" } // @viz: finish
    return finalStr
}