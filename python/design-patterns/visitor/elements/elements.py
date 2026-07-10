class Element(ABC):
    @abstractmethod
    def accept(self, v: Visitor): pass

class Book(Element):
    def __init__(self, price, weight):
        self.price = price
        self.weight = weight
    def accept(self, v):
        v.visit_book(self)