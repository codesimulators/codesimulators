// Visitor interface: Defines operations for every element class
interface Visitor {
  visitBook(book: Book): void;
  visitElectronics(elec: Electronics): void;
}