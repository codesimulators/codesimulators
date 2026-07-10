class MinStack {
    private Stack<Integer> data = new Stack<>();
    private Stack<Integer> minData = new Stack<>();

    public MinStack() { // @viz:init_stack
        // @viz:init_min
    }

    public void push(int val) { // @viz:push_start
        data.push(val); // @viz:push_val
        if (minData.isEmpty() || val <= minData.peek()) { // @viz:min_check
            minData.push(val); // @viz:min_push
        }
    } // @viz:push_end

    public void pop() { // @viz:pop_start
        Integer popped = data.pop(); // @viz:pop_val
        if (popped.equals(minData.peek())) { // @viz:pop_min_check
            minData.pop(); // @viz:min_pop
        }
    } // @viz:pop_end

    public int top() { // @viz:top_start
        return data.peek(); // @viz:top_val
    }

    public int getMin() { // @viz:get_min_start
        return minData.peek(); // @viz:min_val
    }
}