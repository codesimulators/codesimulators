class MyQueue {
    private Stack<Integer> input = new Stack<>();
    private Stack<Integer> output = new Stack<>();

    public void push(int x) { // @viz: push_start
        input.push(x); // @viz: push_val @viz: push_end
    }

    public int pop() { // @viz: pop_start
        peek(); // @viz: pop_peek
        return output.pop(); // @viz: pop_val @viz: pop_end
    }

    public int peek() { // @viz: peek_start
        if (output.isEmpty()) { // @viz: peek_check
            while (!input.isEmpty()) { // @viz: move_loop
                output.push(input.pop()); // @viz: move_pop @viz: move_push
            }
        }
        return output.peek(); // @viz: peek_val @viz: peek_end
    }

    public boolean empty() { // @viz: empty_start
        return input.isEmpty() && output.isEmpty(); // @viz: empty_check
    }
}