class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>(); // @viz: init_stack
        Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '['); // @viz: init_map
        
        for (int i = 0; i < s.length(); i++) { // @viz: loop
            char ch = s.charAt(i); // @viz: char
            
            if (ch == '(' || ch == '{' || ch == '[') { // @viz: check_open
                stack.push(ch); // @viz: push
            } else {
                if (stack.isEmpty()) { // @viz: check_empty
                    return false; // @viz: fail_empty
                }
                
                char top = stack.pop(); // @viz: pop
                if (top != map.get(ch)) { // @viz: check_match
                    return false; // @viz: fail_match
                }
            }
        }
        return stack.isEmpty(); // @viz: finish
    }
}