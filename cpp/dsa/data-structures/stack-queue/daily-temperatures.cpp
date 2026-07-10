class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& tempsValue) {
        int nTotal = tempsValue.size();
        vector<int> results(nTotal, 0); // @viz: init_ans
        stack<int> sIndices; // @viz: init_stack
        
        for (int i = 0; i < nTotal; i++) { // @viz: loop
            while (!sIndices.empty() && tempsValue[i] > tempsValue[sIndices.top()]) { // @viz: while_check
                int prevIdx = sIndices.top(); sIndices.pop(); // @viz: pop
                results[prevIdx] = i - prevIdx; // @viz: calc
            }
            sIndices.push(i); // @viz: push
        }
        
        return results; // @viz: finish
    }
}