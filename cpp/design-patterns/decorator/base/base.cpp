class Espresso : public Beverage {
public:
    double cost() override { return 2.0; }
    std::string describe() override { return "Espresso"; }
};

// Base decorator: IS-A Beverage and HAS-A inner Beverage.
class AddOn : public Beverage {
protected:
    std::unique_ptr<Beverage> inner;
public:
    explicit AddOn(std::unique_ptr<Beverage> b) : inner(std::move(b)) {}
};