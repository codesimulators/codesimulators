class ProductCatalog:
    def __init__(self):
        self._products = ["Laptop", "Phone", "Headphones"]
    def create_iterator(self) -> Iterator:
        return ProductIterator(self._products)