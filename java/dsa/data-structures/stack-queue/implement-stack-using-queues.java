class MyStack {
    private Queue<Integer> qStorage = new LinkedList<>();

    public void push(int x) { // @viz: push_start
        qStorage.offer(x); // @viz: push_val
        for (int i = 0; i < qStorage.size() - 1; i++) { // @viz: loop @viz: push_end
            qStorage.offer(qStorage.poll()); // @viz: rotate_pop @viz: rotate_push
        }
    }

    public int pop() { // @viz: pop_start
        return qStorage.poll(); // @viz: pop_val @viz: pop_end
    }

    public int top() { // @viz: top_start
        return qStorage.peek(); // @viz: top_val @viz: top_end
    }

    public boolean empty() { // @viz: empty_start
        return qStorage.isEmpty(); // @viz: empty_check
    }
}