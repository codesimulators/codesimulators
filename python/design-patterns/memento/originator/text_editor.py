class TextEditor:
    def __init__(self):
        self._text = ""
    def type(self, val): self._text += val
    def get_text(self): return self._text
    
    def save(self) -> Memento:
        return Memento(self._text)
    def restore(self, memento: Memento):
        self._text = memento.get_state()