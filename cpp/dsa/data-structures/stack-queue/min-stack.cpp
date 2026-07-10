class MinStack {
private:
    stack<int> data;
    stack<int> minData;

public:
    MinStack() { // @viz:init_stack
        // @viz:init_min
    }
    
    void push(int val) { // @viz:push_start
        data.push(val); // @viz:push_val
        if (minData.empty() || val <= minData.top()) { // @viz:min_check
            minData.push(val); // @viz:min_push
        }
    } // @viz:push_end
    
    void pop() { // @viz:pop_start
        int popped = data.top(); // @viz:pop_val
        data.pop();
        if (popped == minData.top()) { // @viz:pop_min_check
            minData.pop(); // @viz:min_pop
        }
    } // @viz:pop_end
    
    int top() { // @viz:top_start
        return data.top(); // @viz:top_val
    }
    
    int getMin() { // @viz:get_min_start
        return minData.top(); // @viz:min_val
    }
};