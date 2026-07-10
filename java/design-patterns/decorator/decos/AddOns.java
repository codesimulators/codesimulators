class Milk extends AddOn {
    Milk(Beverage b) { super(b); }
    public double cost() { return inner.cost() + 0.5; }
    public String describe() { return inner.describe() + " + Milk"; }
}
class Whip extends AddOn {
    Whip(Beverage b) { super(b); }
    public double cost() { return inner.cost() + 0.7; }
    public String describe() { return inner.describe() + " + Whip"; }
}