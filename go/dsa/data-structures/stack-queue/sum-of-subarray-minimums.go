func sumSubarrayMins(arr []int) int {
    n := len(arr)
    ple := make([]int, n)
    for i := range ple { ple[i] = -1 } // @viz: init_ple
    nle := make([]int, n)
    for i := range nle { nle[i] = n }  // @viz: init_nle
    stack := []int{}                    // @viz: init_stack

    for i := 0; i < n; i++ { // @viz: loop_ple
        for len(stack) > 0 && arr[stack[len(stack)-1]] >= arr[i] { // @viz: while_ple
            stack = stack[:len(stack)-1] // @viz: pop_ple
        }
        if len(stack) > 0 { // @viz: if_ple
            ple[i] = stack[len(stack)-1] // @viz: set_ple
        }
        stack = append(stack, i) // @viz: push_ple
    }

    stack = []int{} // @viz: reset_stack
    for i := n - 1; i >= 0; i-- { // @viz: loop_nle
        for len(stack) > 0 && arr[stack[len(stack)-1]] > arr[i] { // @viz: while_nle
            stack = stack[:len(stack)-1] // @viz: pop_nle
        }
        if len(stack) > 0 { // @viz: if_nle
            nle[i] = stack[len(stack)-1] // @viz: set_nle
        }
        stack = append(stack, i) // @viz: push_nle
    }

    sum, mod := 0, 1000000007
    for i := 0; i < n; i++ { // @viz: loop_sum
        left := i - ple[i]
        right := nle[i] - i
        sum = (sum + arr[i]*left*right) % mod // @viz: calc_sum
    }
    return sum // @viz: finish
}