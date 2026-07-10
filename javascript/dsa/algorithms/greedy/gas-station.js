/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) { // @viz:mainCall
    let totalTank = 0; // @viz:initTotal
    let currentTank = 0; // @viz:initCurrent
    let startStation = 0; // @viz:initStart
    
    for (let i = 0; i < gas.length; i++) { // @viz:loop
        let netGain = gas[i] - cost[i]; // @viz:computeGain
        totalTank += netGain; // @viz:updateTotal
        currentTank += netGain; // @viz:updateCurrent
        
        if (currentTank < 0) { // @viz:checkTank
            startStation = i + 1; // @viz:pivotStart
            currentTank = 0; // @viz:resetTank
        }
    }
    
    if (totalTank >= 0) { // @viz:checkResult
        return startStation; // @viz:return
    }
    return -1; // @viz:return_fail
};