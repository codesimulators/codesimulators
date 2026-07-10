class Solution {
public:
    string decodeString(string sValue) {
        stack<int> countStack; // @viz: init_counts
        stack<string> resStack; // @viz: init_res_stack
        string currentRes = ""; // @viz: init_res
        int k = 0; // @viz: init_k
        
        for (char ch : sValue) { // @viz: loop
            if (isdigit(ch)) { // @viz: process_char @viz: check_digit
                k = k * 10 + (ch - '0'); // @viz: build_k
            } else if (ch == '[') { // @viz: check_open
                countStack.push(k); // @viz: push_k
                resStack.push(currentRes); // @viz: push_res
                currentRes = ""; // @viz: reset_res
                k = 0; // @viz: reset_k
            } else if (ch == ']') { // @viz: check_close
                string temp = resStack.top(); resStack.pop(); // @viz: pop_res
                int repeatCount = countStack.top(); countStack.pop(); // @viz: pop_k
                for (int i = 0; i < repeatCount; i++) { // @viz: repeat_loop
                    temp += currentRes; // @viz: append
                }
                currentRes = temp; // @viz: update_res
            } else { // @viz: char
                currentRes += ch; // @viz: append_char
            }
        }
        return currentRes; // @viz: finish
    }
}