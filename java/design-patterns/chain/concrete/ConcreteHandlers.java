class BotHandler extends SupportHandler {
    protected boolean canHandle(Ticket t) { return t.getSeverity() == 1; }
    protected void resolve(Ticket t) {
        System.out.println("Bot resolved: " + t.getIssue());
    }
}