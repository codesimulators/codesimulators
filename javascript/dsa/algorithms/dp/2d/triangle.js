var minimumTotal = function(triangle) {
    const n = triangle.length;
    let dp = triangle.map(row => [...row]); // @viz: init
    
    for (let j = 0; j < n; j++) { // @viz: baseInit
        dp[n-1][j] = triangle[n-1][j]; // @viz: baseInit
    }
    
    for (let i = n - 2; i >= 0; i--) { // @viz: loopI
        for (let j = 0; j <= i; j++) { // @viz: loopJ
            const left = dp[i+1][j]; // @viz: computePrep
            const right = dp[i+1][j+1]; // @viz: computePrep
            
            dp[i][j] = triangle[i][j] + Math.min(left, right); // @viz: compute
        }
    }
    return dp[0][0]; // @viz: return
};