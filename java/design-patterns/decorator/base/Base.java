class Espresso implements Beverage {
    public double cost() { return 2.0; }
    public String describe() { return "Espresso"; }
}

abstract class AddOn implements Beverage {
    protected final Beverage inner;
    AddOn(Beverage inner) { this.inner = inner; }
}