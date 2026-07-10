class ProductIterator implements Iterator<string> {
  private position = 0;

  constructor(private products: string[]) {}

  hasNext(): boolean {
    return this.position < this.products.length;
  }

  next(): string {
    const product = this.products[this.position];
    this.position++;
    return product;
  }
}

class ReverseProductIterator implements Iterator<string> {
  private position: number;

  constructor(private products: string[]) {
    this.position = products.length - 1;
  }

  hasNext(): boolean {
    return this.position >= 0;
  }

  next(): string {
    const product = this.products[this.position];
    this.position--;
    return product;
  }
}