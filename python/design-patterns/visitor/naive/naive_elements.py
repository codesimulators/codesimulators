class Book:
    def __init__(self, price, weight):
        self.price = price
        self.weight = weight
    # ❌ Coupled calculation logic
    def calc_tax(self): return self.price * 0.05
    def calc_shipping(self): return self.weight * 2.0