class ProductCatalog:
    def __init__(self):
        # ❌ exposing internal list
        self.products = ["Laptop", "Phone", "Headphones"]

catalog = ProductCatalog()
# Client loops are dependent on lists
for i in range(len(catalog.products)):
    print(catalog.products[i])