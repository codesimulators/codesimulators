class LegacyBankAdapter implements PaymentGateway {
    private final LegacyBank bank;
    LegacyBankAdapter(LegacyBank b) { this.bank = b; }

    public Receipt pay(double amountUsd) {
        int cents = (int) Math.round(amountUsd * 100);
        Object[] r = bank.makePayment(cents, "USD");
        return new Receipt((int) r[0] == 0, (String) r[1]);
    }
}