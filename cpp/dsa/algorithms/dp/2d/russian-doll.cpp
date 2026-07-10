class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size();
        if (n == 0) return 0; // @viz: init
        
        // 1️⃣ Sort: Width asc, Height desc
        sort(envelopes.begin(), envelopes.end(), [](const vector<int>& a, const vector<int>& b) { // @viz: sort
            if (a[0] == b[0]) return a[1] > b[1];
            return a[0] < b[0];
        });
        
        // 2️⃣ DP LIS on Heights
        vector<int> dp(n, 1); // @viz: lis_init
        int maxNesting = 1;
        
        for (int i = 0; i < n; i++) { // @viz: lis_i
            for (int j = 0; j < i; j++) { // @viz: lis_j
                if (envelopes[j][1] < envelopes[i][1]) { // @viz: lis_j
                    dp[i] = max(dp[i], dp[j] + 1); // @viz: lis_update
                }
            }
            maxNesting = max(maxNesting, dp[i]);
        }
        return maxNesting; // @viz: result
    }
};