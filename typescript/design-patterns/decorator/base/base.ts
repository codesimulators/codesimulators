// Concrete component.
class Espresso implements Beverage {
  cost() { return 2.0; }
  describe() { return "Espresso"; }
}

// Base decorator: HAS-A beverage and IS-A beverage.
abstract class AddOn implements Beverage {
  constructor(protected inner: Beverage) {}
  abstract cost(): number;
  abstract describe(): string;
}