class MyQueue<T> {
    private List<T> items = new ArrayList<>();
    public void enqueue(T val) {
        items.add(val);
    }
    public T dequeue() {
        return items.remove(0);
    }
}