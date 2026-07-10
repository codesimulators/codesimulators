struct Receipt { bool ok; std::string ref; };

class PaymentGateway {
public:
    virtual ~PaymentGateway() = default;
    virtual Receipt pay(double amountUsd) = 0;
};