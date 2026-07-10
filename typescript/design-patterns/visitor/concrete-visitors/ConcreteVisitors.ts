class UsTaxVisitor implements Visitor {
  public totalTax = 0;

  visitBook(b: Book) {
    this.totalTax += b.price * 0.05; // 5% tax on books
  }

  visitElectronics(e: Electronics) {
    this.totalTax += e.price * 0.15; // 15% tax on electronics
  }
}

class ShippingWeightVisitor implements Visitor {
  public totalWeight = 0;

  visitBook(b: Book) {
    this.totalWeight += b.weight;
  }

  visitElectronics(e: Electronics) {
    this.totalWeight += e.weight * 1.2; // heavy packaging overhead
  }
}