class RemoteControl {
    private Stack<Command> history = new Stack<>();
    public void executeCommand(Command c) {
        c.execute();
        history.push(c);
    }
    public void undoButton() {
        if (!history.isEmpty()) {
            history.pop().undo();
        }
    }
}