class LegacyBank {                 // the adaptee
    Object[] makePayment(int cents, String ccy) {
        return new Object[]{ 0, "LB-" + cents + ccy };
    }
}