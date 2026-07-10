class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length;
        int[] ple = new int[n]; // @viz: init_ple
        int[] nle = new int[n]; // @viz: init_nle
        Arrays.fill(ple, -1); Arrays.fill(nle, n);
        Stack<Integer> stack = new Stack<>(); // @viz: init_stack

        for (int i = 0; i < n; i++) { // @viz: loop_ple
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) { // @viz: while_ple
                stack.pop(); // @viz: pop_ple
            }
            if (!stack.isEmpty()) { // @viz: if_ple
                ple[i] = stack.peek(); // @viz: set_ple
            }
            stack.push(i); // @viz: push_ple
        }

        stack.clear(); // @viz: reset_stack
        for (int i = n - 1; i >= 0; i--) { // @viz: loop_nle
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) { // @viz: while_nle
                stack.pop(); // @viz: pop_nle
            }
            if (!stack.isEmpty()) { // @viz: if_nle
                nle[i] = stack.peek(); // @viz: set_nle
            }
            stack.push(i); // @viz: push_nle
        }

        long sum = 0;
        int MOD = 1_000_000_007;
        for (int i = 0; i < n; i++) { // @viz: loop_sum
            long left = i - ple[i];
            long right = nle[i] - i;
            sum = (sum + left * right * arr[i]) % MOD; // @viz: calc_sum
        }
        return (int) sum; // @viz: finish
    }
}