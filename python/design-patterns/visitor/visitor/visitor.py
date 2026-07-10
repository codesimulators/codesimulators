from abc import ABC, abstractmethod

class Visitor(ABC):
    @abstractmethod
    def visit_book(self, book): pass
    @abstractmethod
    def visit_electronics(self, elec): pass