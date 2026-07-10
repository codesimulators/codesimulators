class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>(); // @viz: init
        
        for (String token : tokens) { // @viz: loop
            if (isNumber(token)) { // @viz: char @viz: check_num
                stack.push(Integer.parseInt(token)); // @viz: push
            } else { // @viz: op
                int b = stack.pop(); // @viz: pop_b
                int a = stack.pop(); // @viz: pop_a
                
                int result;
                if (token.equals("+")) {
                    result = a + b; // @viz: calc_add
                } else if (token.equals("-")) {
                    result = a - b; // @viz: calc_sub
                } else if (token.equals("*")) {
                    result = a * b; // @viz: calc_mul
                } else if (token.equals("/")) {
                    result = a / b; // @viz: calc_div
                }
                
                stack.push(result); // @viz: push_res
            }
        }
        return stack.pop(); // @viz: finish
    }
}