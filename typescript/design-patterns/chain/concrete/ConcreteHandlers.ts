class BotHandler extends SupportHandler {
  protected canHandle(t: Ticket) { return t.severity === 1; }
  protected resolve(t: Ticket) {
    console.log(\