class Milk : public AddOn {
public:
    using AddOn::AddOn;   // inherit the constructor
    double cost() override { return inner->cost() + 0.5; }
    std::string describe() override { return inner->describe() + " + Milk"; }
};
class Whip : public AddOn {
public:
    using AddOn::AddOn;
    double cost() override { return inner->cost() + 0.7; }
    std::string describe() override { return inner->describe() + " + Whip"; }
};