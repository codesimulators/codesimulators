func canCompleteCircuit(gas []int, cost []int) int { // @viz:mainCall
    totalTank, currentTank := 0, 0 // @viz:initTotal
    startStation := 0 // @viz:initStart
    
    for i := 0; i < len(gas); i++ { // @viz:loop
        netGain := gas[i] - cost[i] // @viz:computeGain
        totalTank += netGain // @viz:updateTotal
        currentTank += netGain // @viz:updateCurrent
        
        if currentTank < 0 { // @viz:checkTank
            startStation = i + 1 // @viz:pivotStart
            currentTank = 0 // @viz:resetTank
        }
    }
    
    if totalTank >= 0 { // @viz:checkResult
        return startStation // @viz:return
    }
    return -1 // @viz:return_fail
}