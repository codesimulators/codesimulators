class Solution {
    public int matrixChainOrder(int[] dims) {
        int n = dims.length - 1;
        int[][] dp = new int[n + 1][n + 1]; // @viz: init
        
        for (int len = 2; len <= n; len++) { // @viz: loopLen
            for (int i = 1; i <= n - len + 1; i++) { // @viz: loopI
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE; // @viz: loopJ
                
                for (int k = i; k < j; k++) { // @viz: loopK
                    int cost = dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j]; // @viz: compute
                    if (cost < dp[i][j]) { // @viz: check
                        dp[i][j] = cost; // @viz: update
                    }
                }
            }
        }
        return dp[1][n]; // @viz: result
    }
}