class Milk(AddOn):
    def cost(self): return self.inner.cost() + 0.5
    def describe(self): return self.inner.describe() + " + Milk"

class Whip(AddOn):
    def cost(self): return self.inner.cost() + 0.7
    def describe(self): return self.inner.describe() + " + Whip"