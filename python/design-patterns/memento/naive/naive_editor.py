class TextEditor:
    def __init__(self):
        self.text = ""
        self.cursor_pos = 0

class HistoryManager:
    def __init__(self):
        self._states = []
    def save(self, editor):
        # ❌ history manager copies raw details
        self._states.append((editor.text, editor.cursor_pos))
    def undo(self, editor):
        if self._states:
            text, pos = self._states.pop()
            editor.text = text
            editor.cursor_pos = pos