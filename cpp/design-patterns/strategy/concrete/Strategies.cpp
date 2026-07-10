class CardStrategy : public PaymentStrategy {
public:
    double charge(double amount) override {
        return amount + amount * 0.029 + 0.30;
    }
};

class CryptoStrategy : public PaymentStrategy {
public:
    double charge(double amount) override {
        return amount + amount * 0.01; // 1% network fee
    }
};