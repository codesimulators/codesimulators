interface IterableCollection {
  createIterator(): Iterator<string>;
}

class ProductCatalog implements IterableCollection {
  private products: string[] = ["Laptop", "Phone", "Headphones"];

  createIterator(): Iterator<string> {
    return new ProductIterator(this.products);
  }

  createReverseIterator(): Iterator<string> {
    return new ReverseProductIterator(this.products);
  }
}