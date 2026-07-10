double charge(double amount, std::string method) {
    if (method == "card") {
        double fee = amount * 0.029 + 0.30;
        return amount + fee;
    } else if (method == "paypal") {
        double fee = amount * 0.0349 + 0.49;
        return amount + fee;
    } else if (method == "crypto") {
        double fee = amount * 0.01;
        return amount + fee;
    }
    throw std::invalid_argument("Unknown method");
}