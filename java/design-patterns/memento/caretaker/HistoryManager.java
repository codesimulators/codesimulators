class HistoryManager {
    private Stack<Memento> history = new Stack<>();
    public void push(Memento m) { history.push(m); }
    public Memento pop() {
        return history.isEmpty() ? null : history.pop();
    }
}