from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def interpret(self, context: dict) -> float: pass