class Solution {
public:
    int evalRPN(vector<string>& tokensValue) {
        stack<int> st; // @viz: init
        
        for (string& t : tokensValue) { // @viz: loop
            if (isdigit(t.back()) || t.size() > 1) { // @viz: char @viz: check_num
                st.push(stoi(t)); // @viz: push
            } else { // @viz: op
                int b = st.top(); st.pop(); // @viz: pop_b
                int a = st.top(); st.pop(); // @viz: pop_a
                
                int res;
                if (t == "+") {
                    res = a + b; // @viz: calc_add
                } else if (t == "-") {
                    res = a - b; // @viz: calc_sub
                } else if (t == "*") {
                    res = a * b; // @viz: calc_mul
                } else if (t == "/") {
                    res = a / b; // @viz: calc_div
                }
                
                st.push(res); // @viz: push_res
            }
        }
        return st.top(); // @viz: finish
    }
}