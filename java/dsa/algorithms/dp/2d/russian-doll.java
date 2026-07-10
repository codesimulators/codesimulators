class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        int n = envelopes.length;
        if (n == 0) return 0; // @viz: init
        
        // 1️⃣ Sort: Width asc, Height desc
        Arrays.sort(envelopes, (a, b) -> { // @viz: sort
            if (a[0] == b[0]) return b[1] - a[1];
            return a[0] - b[0];
        });
        
        // 2️⃣ DP LIS on Heights
        int[] dp = new int[n]; // @viz: lis_init
        Arrays.fill(dp, 1);
        int maxNesting = 1;
        
        for (int i = 0; i < n; i++) { // @viz: lis_i
            for (int j = 0; j < i; j++) { // @viz: lis_j
                if (envelopes[j][1] < envelopes[i][1]) { // @viz: lis_j
                    dp[i] = Math.max(dp[i], dp[j] + 1); // @viz: lis_update
                }
            }
            maxNesting = Math.max(maxNesting, dp[i]);
        }
        return maxNesting; // @viz: result
    }
}