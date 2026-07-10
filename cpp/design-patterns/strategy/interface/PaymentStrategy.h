class PaymentStrategy {
public:
    virtual ~PaymentStrategy() = default;
    virtual double charge(double amount) = 0;  // pure virtual
};