// Invoker: Executed commands are stored in a history stack for undo support
class RemoteControl {
  private history: Command[] = [];

  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
  }

  undoButton() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
    }
  }
}