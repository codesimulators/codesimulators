var minFallingPathSum = function(matrix) {
    const n = matrix.length;
    let dp = Array(n).fill().map(() => Array(n).fill(0)); // @viz: init
    
    for (let j = 0; j < n; j++) { // @viz: baseInit
        dp[0][j] = matrix[0][j]; // @viz: baseInit
    }
    
    for (let i = 1; i < n; i++) { // @viz: loopI
        for (let j = 0; j < n; j++) { // @viz: loopJ
            const mid = dp[i-1][j]; // @viz: computePrep
            const left = j > 0 ? dp[i-1][j-1] : Infinity; // @viz: computePrep
            const right = j < n - 1 ? dp[i-1][j+1] : Infinity; // @viz: computePrep
            
            dp[i][j] = matrix[i][j] + Math.min(mid, left, right); // @viz: compute
        }
    }
    return Math.min(...dp[n-1]); // @viz: return
};