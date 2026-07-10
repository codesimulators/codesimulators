class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& n1, vector<int>& n2) {
        unordered_map<int, int> nMap; // @viz: init_map
        stack<int> s; // @viz: init_stack
        
        for (int val : n2) { // @viz: loop
            while (!s.empty() && val > s.top()) { // @viz: while_check
                nMap[s.top()] = val; // @viz: map_set
                s.pop();
            }
            s.push(val); // @viz: push
        }
        
        vector<int> result;
        for (int x : n1) {
            result.push_back(nMap.count(x) ? nMap[x] : -1);
        }
        return result; // @viz: finish
    }
}