class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>(); // @viz: init
        int num = 0; // @viz: init_num
        char sign = '+'; // @viz: init_sign
        
        for (int i = 0; i < s.length(); i++) { // @viz: loop
            char c = s.charAt(i);
            
            if (Character.isDigit(c)) { // @viz: check_digit
                num = num * 10 + (c - '0'); // @viz: build_num
            }
            
            if ((!Character.isDigit(c) && c != ' ') || i == s.length() - 1) { // @viz: check_op
                if (sign == '+') { // @viz: check_pos
                    stack.push(num); // @viz: push_pos
                } else if (sign == '-') { // @viz: check_neg
                    stack.push(-num); // @viz: push_neg
                } else if (sign == '*') { // @viz: check_mul
                    stack.push(stack.pop() * num); // @viz: push_mul
                } else if (sign == '/') { // @viz: check_div
                    stack.push(stack.pop() / num); // @viz: push_div
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