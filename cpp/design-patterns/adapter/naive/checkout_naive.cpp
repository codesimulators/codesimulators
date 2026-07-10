std::string Checkout::buy(double amountUsd) {
    // ❌ each caller must remember the quirks by hand:
    int cents = (int)(amountUsd * 100 + 0.5);          // dollars -> cents
    auto [status, txn] = bank.makePayment(cents, "USD");
    if (status != 0) throw std::runtime_error("declined");  // 0 == success (?!)
    return txn;
}

bool Refunds::refund(double amountUsd) {
    // ❌ ...and the SAME conversion is copy-pasted here:
    int cents = (int)(amountUsd * 100 + 0.5);
    auto [status, txn] = bank.makePayment(-cents, "USD");
    return status == 0;
}