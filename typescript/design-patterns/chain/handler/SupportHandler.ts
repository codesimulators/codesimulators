// The Base Handler interface/abstract class linking nodes together
abstract class SupportHandler {
  private nextHandler: SupportHandler | null = null;

  setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler; // allows chaining triggers
  }

  handle(ticket: Ticket): void {
    if (this.canHandle(ticket)) {
      this.resolve(ticket);
    } else if (this.nextHandler) {
      this.nextHandler.handle(ticket); // 🎯 Pass request down the line
    } else {
      console.log(\