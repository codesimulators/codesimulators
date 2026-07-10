// Naive approach: client iterates directly across private collection formats
class ProductCatalog {
  // ❌ Exposing internal collection exposes implementation details
  public products: string[] = ["Laptop", "Phone", "Headphones"];
}

const catalog = new ProductCatalog();
// Client is coupled to the fact that products is a flat string array
for (let i = 0; i < catalog.products.length; i++) {
  console.log("Product: " + catalog.products[i]);
}
// Changing products to a binary tree or linked list breaks all client loop codes!