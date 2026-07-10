class UsTaxVisitor(Visitor):
    def __init__(self): self.total_tax = 0
    def visit_book(self, b): self.total_tax += b.price * 0.05
    def visit_electronics(self, e): self.total_tax += e.price * 0.15