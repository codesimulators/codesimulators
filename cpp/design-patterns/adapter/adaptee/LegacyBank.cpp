class LegacyBank {                  // adaptee
public:
    std::pair<int,std::string> makePayment(int cents, std::string ccy) {
        return { 0, "LB-" + std::to_string(cents) + ccy };
    }
};