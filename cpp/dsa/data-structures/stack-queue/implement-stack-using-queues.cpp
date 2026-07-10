class MyStack {
private:
    queue<int> q;

public:
    void push(int x) { // @viz: push_start
        q.push(x); // @viz: push_val
        for (int i = 0; i < q.size() - 1; i++) { // @viz: loop @viz: push_end
            int val = q.front(); // @viz: rotate_pop
            q.pop();
            q.push(val); // @viz: rotate_push
        }
    }

    int pop() { // @viz: pop_start
        int val = q.front(); // @viz: pop_val
        q.pop();
        return val; // @viz: pop_end
    }

    int top() { // @viz: top_start
        return q.front(); // @viz: top_val @viz: top_end
    }

    bool empty() { // @viz: empty_start
        return q.empty(); // @viz: empty_check
    }
};