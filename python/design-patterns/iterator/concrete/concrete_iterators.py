class ProductIterator(Iterator):
    def __init__(self, products):
        self.products = products
        self.index = 0
    def has_next(self):
        return self.index < len(self.products)
    def next(self):
        p = self.products[self.index]
        self.index += 1
        return p