class Solution {
public:
    bool isValid(string s) {
        stack<char> st; // @viz: init_stack
        unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}}; // @viz: init_map
        
        for (char ch : s) { // @viz: loop @viz: char
            if (ch == '(' || ch == '{' || ch == '[') { // @viz: check_open
                st.push(ch); // @viz: push
            } else {
                if (st.empty()) { // @viz: check_empty
                    return false; // @viz: fail_empty
                }
                
                char top = st.top(); // @viz: pop
                st.pop();
                
                if (top != map[ch]) { // @viz: check_match
                    return false; // @viz: fail_match
                }
            }
        }
        return st.empty(); // @viz: finish
    }
}