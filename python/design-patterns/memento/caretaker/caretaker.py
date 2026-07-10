class HistoryManager:
    def __init__(self):
        self._history = []
    def push(self, memento):
        self._history.append(memento)
    def pop(self):
        if self._history:
            return self._history.pop()