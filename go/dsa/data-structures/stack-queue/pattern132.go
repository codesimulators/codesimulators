func find132pattern(numsValue []int) bool {
    s3Value := math.MinInt32 // @viz: init_s3
    monoStack := []int{} // @viz: init_stack
    
    for i := len(numsValue) - 1; i >= 0; i-- { // @viz: loop
        if numsValue[i] < s3Value { // @viz: check_132
            return true // @viz: found
        }
        
        for len(monoStack) > 0 && numsValue[i] > monoStack[len(monoStack)-1] { // @viz: while_reduction
            s3Value = monoStack[len(monoStack)-1] // @viz: update_s3
            monoStack = monoStack[:len(monoStack)-1]
        }
        
        monoStack = append(monoStack, numsValue[i]) // @viz: push_s2
    }
    
    return false // @viz: finish
}