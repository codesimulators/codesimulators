public abstract class SupportHandler {
    private SupportHandler nextHandler;

    public SupportHandler setNext(SupportHandler handler) {
        this.nextHandler = handler;
        return handler;
    }
    public void handle(Ticket ticket) {
        if (canHandle(ticket)) {
            resolve(ticket);
        } else if (nextHandler != null) {
            nextHandler.handle(ticket);
        } else {
            System.out.println("End of chain reached.");
        }
    }
    protected abstract boolean canHandle(Ticket ticket);
    protected abstract void resolve(Ticket ticket);
}