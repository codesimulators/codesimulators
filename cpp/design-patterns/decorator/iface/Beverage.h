class Beverage {
public:
    virtual ~Beverage() = default;
    virtual double cost() = 0;
    virtual std::string describe() = 0;
};