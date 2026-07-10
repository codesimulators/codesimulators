class Checkout {
    std::unique_ptr<PaymentStrategy> strategy;
public:
    explicit Checkout(std::unique_ptr<PaymentStrategy> s)
        : strategy(std::move(s)) {}

    void setStrategy(std::unique_ptr<PaymentStrategy> s) {
        strategy = std::move(s);
    }

    double pay(double amount) {
        return strategy->charge(amount); // pure delegation
    }
};

// ── Client ──
Checkout cart(std::make_unique<CardStrategy>());
cart.pay(100);                 // 103.20
cart.setStrategy(std::make_unique<CryptoStrategy>());
cart.pay(100);                 // 101.00