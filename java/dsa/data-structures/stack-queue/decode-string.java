class Solution {
    public String decodeString(String s) {
        Stack<Integer> countStack = new Stack<>(); // @viz: init_counts
        Stack<StringBuilder> resStack = new Stack<>(); // @viz: init_res_stack
        StringBuilder currentRes = new StringBuilder(); // @viz: init_res
        int k = 0; // @viz: init_k
        
        for (char ch : s.toCharArray()) { // @viz: loop
            if (Character.isDigit(ch)) { // @viz: process_char @viz: check_digit
                k = k * 10 + (ch - '0'); // @viz: build_k
            } else if (ch == '[') { // @viz: check_open
                countStack.push(k); // @viz: push_k
                resStack.push(currentRes); // @viz: push_res
                currentRes = new StringBuilder(); // @viz: reset_res
                k = 0; // @viz: reset_k
            } else if (ch == ']') { // @viz: check_close
                StringBuilder temp = resStack.pop(); // @viz: pop_res
                int repeatCount = countStack.pop(); // @viz: pop_k
                for (int i = 0; i < repeatCount; i++) { // @viz: repeat_loop
                    temp.append(currentRes); // @viz: append
                }
                currentRes = temp; // @viz: update_res
            } else { // @viz: char
                currentRes.append(ch); // @viz: append_char
            }
        }
        return currentRes.toString(); // @viz: finish
    }
}