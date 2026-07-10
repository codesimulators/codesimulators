class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        vector<int> ple(n, -1); // @viz: init_ple
        vector<int> nle(n, n);  // @viz: init_nle
        stack<int> s;           // @viz: init_stack

        for (int i = 0; i < n; i++) { // @viz: loop_ple
            while (!s.empty() && arr[s.top()] >= arr[i]) { // @viz: while_ple
                s.pop(); // @viz: pop_ple
            }
            if (!s.empty()) { // @viz: if_ple
                ple[i] = s.top(); // @viz: set_ple
            }
            s.push(i); // @viz: push_ple
        }

        while (!s.empty()) s.pop(); // @viz: reset_stack
        for (int i = n - 1; i >= 0; i--) { // @viz: loop_nle
            while (!s.empty() && arr[s.top()] > arr[i]) { // @viz: while_nle
                s.pop(); // @viz: pop_nle
            }
            if (!s.empty()) { // @viz: if_nle
                nle[i] = s.top(); // @viz: set_nle
            }
            s.push(i); // @viz: push_nle
        }

        long long sum = 0, MOD = 1e9 + 7;
        for (int i = 0; i < n; i++) { // @viz: loop_sum
            sum = (sum + (long long)arr[i] * (i - ple[i]) * (nle[i] - i)) % MOD; // @viz: calc_sum
        }
        return sum; // @viz: finish
    }
}