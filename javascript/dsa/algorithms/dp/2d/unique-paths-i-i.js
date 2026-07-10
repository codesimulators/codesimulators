var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const dp = Array(m).fill().map(() => Array(n).fill(0)); // @viz: init
    
    if (obstacleGrid[0][0] === 1) { // @viz: baseCheck
        return 0; // @viz: baseReturn
    }
    dp[0][0] = 1; // @viz: baseSet
    
    for (let i = 0; i < m; i++) { // @viz: loopI
        for (let j = 0; j < n; j++) { // @viz: loopJ
            if (i === 0 && j === 0) { // @viz: skipStart
                continue; // @viz: skipStartAction
            }
            if (obstacleGrid[i][j] === 1) { // @viz: obstacleCheck
                dp[i][j] = 0; // @viz: obstacleSet
            } else {
                const top = i > 0 ? dp[i-1][j] : 0; // @viz: computePrep
                const left = j > 0 ? dp[i][j-1] : 0; // @viz: computePrep
                dp[i][j] = top + left; // @viz: compute
            }
        }
    }
    return dp[m-1][n-1]; // @viz: return
};