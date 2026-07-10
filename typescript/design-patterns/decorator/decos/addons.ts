class Milk extends AddOn {
  cost() { return this.inner.cost() + 0.5; }
  describe() { return this.inner.describe() + " + Milk"; }
}
class Whip extends AddOn {
  cost() { return this.inner.cost() + 0.7; }
  describe() { return this.inner.describe() + " + Whip"; }
}