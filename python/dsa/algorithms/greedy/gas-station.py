class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int: # @viz:mainCall
        total_tank, current_tank = 0, 0 # @viz:initTotal
        start_station = 0 # @viz:initStart
        
        for i in range(len(gas)): # @viz:loop
            net_gain = gas[i] - cost[i] # @viz:computeGain
            total_tank += net_gain # @viz:updateTotal
            current_tank += net_gain # @viz:updateCurrent
            
            if current_tank < 0: # @viz:checkTank
                start_station = i + 1 # @viz:pivotStart
                current_tank = 0 # @viz:resetTank
        
        if total_tank >= 0: # @viz:checkResult
            return start_station # @viz:return
        return -1 # @viz:return_fail