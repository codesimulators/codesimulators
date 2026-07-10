class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>(); // @viz: init
        String[] parts = path.split("/"); // @viz: split
        
        for (String part : parts) { // @viz: loop
            if (part.equals(".") || part.isEmpty()) { // @viz: check_skip
                continue; // @viz: skip
            }
            
            if (part.equals("..")) { // @viz: check_parent
                if (!stack.isEmpty()) { // @viz: check_pop
                    stack.pop(); // @viz: pop
                }
            } else {
                stack.push(part); // @viz: push
            }
        }
        
        return "/" + String.join("/", stack); // @viz: finish
    }
}