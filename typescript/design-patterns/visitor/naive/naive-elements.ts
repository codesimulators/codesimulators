// Naive approach: item classes are modified every time a new calculation is added
class Book {
  constructor(public price: number, public weight: number) {}

  // ❌ Adding a new EU_Tax or ExportToJSON requires modifying this class
  calculateUsTax() { return this.price * 0.05; }
  calculateShipping() { return this.weight * 2.0; }
}

class Electronics {
  constructor(public price: number, public weight: number) {}

  // ❌ ...and this class must be updated too, duplicating calculation hooks
  calculateUsTax() { return this.price * 0.15; }
  calculateShipping() { return this.weight * 5.0; }
}