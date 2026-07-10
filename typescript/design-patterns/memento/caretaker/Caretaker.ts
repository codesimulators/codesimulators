// Caretaker: manages history stack. Never reads or modifies memento state contents.
class HistoryManager {
  private history: Memento[] = [];

  push(m: Memento) {
    this.history.push(m);
  }

  pop(): Memento | undefined {
    return this.history.pop();
  }
}