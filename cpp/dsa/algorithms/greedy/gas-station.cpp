class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) { // @viz:mainCall
        int totalTank = 0, currentTank = 0; // @viz:initTotal
        int startStation = 0; // @viz:initStart
        
        for (int i = 0; i < gas.size(); i++) { // @viz:loop
            int netGain = gas[i] - cost[i]; // @viz:computeGain
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
    }
};