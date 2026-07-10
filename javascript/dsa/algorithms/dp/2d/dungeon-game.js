var calculateMinimumHP = function(dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(0)); // @viz: init
    
    dp[m-1][n-1] = Math.max(1, 1 - dungeon[m-1][n-1]); // @viz: baseInit
    
    for (let j = n - 2; j >= 0; j--) { // @viz: baseRowInit
        dp[m-1][j] = Math.max(1, dp[m-1][j+1] - dungeon[m-1][j]);
    }
    for (let i = m - 2; i >= 0; i--) { // @viz: baseColInit
        dp[i][n-1] = Math.max(1, dp[i+1][n-1] - dungeon[i][n-1]);
    }
    
    for (let i = m - 2; i >= 0; i--) { // @viz: loopI
        for (let j = n - 2; j >= 0; j--) { // @viz: loopJ
            const right = dp[i][j+1]; // @viz: computePrep
            const down = dp[i+1][j]; // @viz: computePrep
            
            dp[i][j] = Math.max(1, Math.min(right, down) - dungeon[i][j]); // @viz: compute
        }
    }
    return dp[0][0]; // @viz: return
};