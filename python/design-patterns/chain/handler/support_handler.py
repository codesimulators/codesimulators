from abc import ABC, abstractmethod

class SupportHandler(ABC):
    def __init__(self):
        self._next_handler = None

    def set_next(self, handler):
        self._next_handler = handler
        return handler

    def handle(self, ticket):
        if self._can_handle(ticket):
            self._resolve(ticket)
        elif self._next_handler:
            self._next_handler.handle(ticket)
        else:
            print("End of chain: unresolved")

    @abstractmethod
    def _can_handle(self, ticket) -> bool: pass
    @abstractmethod
    def _resolve(self, ticket): pass