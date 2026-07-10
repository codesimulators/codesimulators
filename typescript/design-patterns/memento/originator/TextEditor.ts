// Originator: owns the private state, creates and restores mementos
class TextEditor {
  private text = "";

  type(words: string) {
    this.text += words;
  }

  getText() { return this.text; }

  // 🎯 Create snapshot token
  save(): Memento {
    return new Memento(this.text);
  }

  // 🎯 Restore state from token
  restore(memento: Memento): void {
    this.text = memento.getState();
  }
}