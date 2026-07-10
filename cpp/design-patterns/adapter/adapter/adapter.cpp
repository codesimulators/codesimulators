class LegacyBankAdapter : public PaymentGateway {
    LegacyBank bank;
public:
    Receipt pay(double amountUsd) override {
        int cents = (int)(amountUsd * 100 + 0.5);
        auto [status, txn] = bank.makePayment(cents, "USD");
        return { status == 0, txn };
    }
};