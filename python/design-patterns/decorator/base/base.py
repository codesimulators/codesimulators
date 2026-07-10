class Espresso(Beverage):
    def cost(self): return 2.0
    def describe(self): return "Espresso"

class AddOn(Beverage):
    def __init__(self, inner: Beverage):
        self.inner = inner