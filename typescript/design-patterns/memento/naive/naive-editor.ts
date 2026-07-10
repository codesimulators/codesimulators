// Naive approach: History manager directly reads and exposes private editor variables
class TextEditor {
  public text = "";
  public cursorCol = 0;
  public cursorRow = 0;
}

class HistoryManager {
  // ❌ Storing states in external classes exposes private internal fields
  private states: { text: string; col: number; row: number }[] = [];

  save(editor: TextEditor) {
    this.states.push({
      text: editor.text,
      col: editor.cursorCol,
      row: editor.cursorRow
    });
  }

  undo(editor: TextEditor) {
    const prev = this.states.pop();
    if (prev) {
      editor.text = prev.text; // ❌ Direct mutations violate encapsulation!
      editor.cursorCol = prev.col;
    }
  }
}