class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n]; // @viz: init_ans
        Stack<Integer> stack = new Stack<>(); // @viz: init_stack
        
        for (int i = 0; i < n; i++) { // @viz: loop
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) { // @viz: while_check
                int prevIndex = stack.pop(); // @viz: pop
                result[prevIndex] = i - prevIndex; // @viz: calc
            }
            stack.push(i); // @viz: push
        }
        
        return result; // @viz: finish
    }
}