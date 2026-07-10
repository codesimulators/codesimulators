def sumSubarrayMins(arr: List[int]) -> int:
    n = len(arr)
    ple = [-1] * n  # @viz: init_ple
    nle = [n] * n   # @viz: init_nle
    stack = []       # @viz: init_stack

    for i in range(n):  # @viz: loop_ple
        while stack and arr[stack[-1]] >= arr[i]:  # @viz: while_ple
            stack.pop()  # @viz: pop_ple
        if stack:  # @viz: if_ple
            ple[i] = stack[-1]  # @viz: set_ple
        stack.append(i)  # @viz: push_ple

    stack = []  # @viz: reset_stack
    for i in range(n - 1, -1, -1):  # @viz: loop_nle
        while stack and arr[stack[-1]] > arr[i]:  # @viz: while_nle
            stack.pop()  # @viz: pop_nle
        if stack:  # @viz: if_nle
            nle[i] = stack[-1]  # @viz: set_nle
        stack.append(i)  # @viz: push_nle

    MOD = 10**9 + 7
    total = 0
    for i in range(n):  # @viz: loop_sum
        left = i - ple[i]
        right = nle[i] - i
        total = (total + arr[i] * left * right) % MOD  # @viz: calc_sum

    return total  # @viz: finish