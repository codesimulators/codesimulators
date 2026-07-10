function matrixChainOrder(dims) {
    const n = dims.length - 1; // Number of matrices
    const dp = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0)); // @viz: init
    
    // len is chain length (from 2 matrices up to n)
    for (let len = 2; len <= n; len++) { // @viz: loopLen
        for (let i = 1; i <= n - len + 1; i++) { // @viz: loopI
            let j = i + len - 1;
            dp[i][j] = Infinity; // @viz: loopJ
            
            for (let k = i; k < j; k++) { // @viz: loopK
                const cost = dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j]; // @viz: compute
                if (cost < dp[i][j]) { // @viz: check
                    dp[i][j] = cost; // @viz: update
                }
            }
        }
    }
    return dp[1][n]; // @viz: result
}