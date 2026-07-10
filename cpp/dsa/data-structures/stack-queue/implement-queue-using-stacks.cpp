class MyQueue {
private:
    stack<int> input, output;

public:
    void push(int x) { // @viz: push_start
        input.push(x); // @viz: push_val @viz: push_end
    }

    int pop() { // @viz: pop_start
        int val = peek(); // @viz: pop_peek
        output.pop(); // @viz: pop_val @viz: pop_end
        return val;
    }

    int peek() { // @viz: peek_start
        if (output.empty()) { // @viz: peek_check
            while (!input.empty()) { // @viz: move_loop
                output.push(input.top()); // @viz: move_push
                input.pop(); // @viz: move_pop
            }
        }
        return output.top(); // @viz: peek_val @viz: peek_end
    }

    bool empty() { // @viz: empty_start
        return input.empty() && output.empty(); // @viz: empty_check
    }
};