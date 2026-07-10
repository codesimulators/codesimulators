class Checkout {
    LegacyBank bank = new LegacyBank();
    String buy(double amountUsd) {
        // ❌ each caller must remember the quirks by hand:
        int cents = (int) Math.round(amountUsd * 100);   // dollars -> cents
        Object[] res = bank.makePayment(cents, "USD");
        if ((int) res[0] != 0) throw new RuntimeException("declined"); // 0 == ok
        return (String) res[1];
    }
}

class Refunds {
    LegacyBank bank = new LegacyBank();
    boolean refund(double amountUsd) {
        // ❌ ...and the SAME conversion is copy-pasted here:
        int cents = (int) Math.round(amountUsd * 100);
        Object[] res = bank.makePayment(-cents, "USD");
        return (int) res[0] == 0;
    }
}