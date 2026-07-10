// Element interface: Accept visitors to execute external operations
interface ElementNode {
  accept(v: Visitor): void;
}

class Book implements ElementNode {
  constructor(public price: number, public weight: number) {}

  accept(v: Visitor) {
    // 🎯 Double Dispatch: redirects execution back to visitor
    v.visitBook(this);
  }
}

class Electronics implements ElementNode {
  constructor(public price: number, public weight: number) {}

  accept(v: Visitor) {
    v.visitElectronics(this);
  }
}