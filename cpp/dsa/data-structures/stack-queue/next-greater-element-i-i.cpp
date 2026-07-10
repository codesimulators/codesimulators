class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& v) {
        int sz = v.size();
        vector<int> res(sz, -1); // @viz: init_ans
        stack<int> indices; // @viz: init_stack
        
        for (int i = 0; i < 2 * sz; i++) { // @viz: loop
            int x = v[i % sz]; // @viz: get_val
            while (!indices.empty() && x > v[indices.top()]) { // @viz: while_check
                res[indices.top()] = x; // @viz: pop_ans
                indices.pop();
            }
            if (i < sz) { // @viz: push_check
                indices.push(i); // @viz: push
            }
        }
        
        return res; // @viz: finish
    }
}