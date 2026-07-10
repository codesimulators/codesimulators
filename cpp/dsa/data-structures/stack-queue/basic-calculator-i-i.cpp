class Solution {
public:
    int calculate(string sValue) {
        vector<int> stack; // @viz: init
        long num = 0; // @viz: init_num
        char sign = '+'; // @viz: init_sign
        
        for (int i = 0; i < sValue.length(); i++) { // @viz: loop
            char c = sValue[i];
            
            if (isdigit(c)) { // @viz: check_digit
                num = num * 10 + (c - '0'); // @viz: build_num
            }
            
            if ((!isdigit(c) && c != ' ') || i == sValue.length() - 1) { // @viz: check_op
                if (sign == '+') { // @viz: check_pos
                    stack.push_back(num); // @viz: push_pos
                } else if (sign == '-') { // @viz: check_neg
                    stack.push_back(-num); // @viz: push_neg
                } else if (sign == '*') { // @viz: check_mul
                    int last = stack.back(); stack.pop_back();
                    stack.push_back(last * num); // @viz: push_mul
                } else if (sign == '/') { // @viz: check_div
                    int last = stack.back(); stack.pop_back();
                    stack.push_back(last / num); // @viz: push_div
                }
                sign = c; // @viz: update_sign
                num = 0; // @viz: reset_num
            }
        }
        
        int result = 0;
        for (int i : stack) result += i;
        return result; // @viz: finish
    }
}