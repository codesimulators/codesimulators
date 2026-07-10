class Memento:
    def __init__(self, state: str):
        self._state = state
    def get_state(self) -> str:
        return self._state