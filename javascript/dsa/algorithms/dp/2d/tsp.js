function solveTSP(dist) {
    const n = dist.length;
    const dp = Array(1 << n).fill(0).map(() => Array(n).fill(Infinity)); // @viz: init
    
    dp[1][0] = 0; // @viz: base
    
    for (let mask = 1; mask < (1 << n); mask++) { // @viz: loopMask
        for (let u = 0; u < n; u++) { // @viz: loopU
            if (!(mask & (1 << u))) continue; 
            
            for (let v = 0; v < n; v++) { // @viz: loopV
                if (mask & (1 << v)) continue;
                
                const nextMask = mask | (1 << v); // @viz: next
                const cost = dp[mask][u] + dist[u][v]; // @viz: compute
                if (cost < dp[nextMask][v]) { // @viz: check
                    dp[nextMask][v] = cost; // @viz: update
                }
            }
        }
    }
    
    // Return to origin
    let minCost = Infinity; // @viz: resultInit
    const finalMask = (1 << n) - 1;
    for (let i = 1; i < n; i++) { // @viz: resultLoop
        const total = dp[finalMask][i] + dist[i][0]; // @viz: resultCompute
        if (total < minCost) { // @viz: resultCheck
             minCost = total; // @viz: resultUpdate
        }
    }
    return minCost; // @viz: result
}