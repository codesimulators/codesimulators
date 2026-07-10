class Stack<T> {
    private List<T> items = new ArrayList<>();
    public void push(T element) {
        items.add(element);
    }
    public T pop() {
        return items.remove(items.size() - 1);
    }
}