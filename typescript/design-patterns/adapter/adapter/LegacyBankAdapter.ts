// Implements what we want, wraps what we have.
class LegacyBankAdapter implements PaymentGateway {
  constructor(private bank: LegacyBank) {}

  pay(amountUsd: number) {
    const cents = Math.round(amountUsd * 100);          // translate input
    const res = this.bank.makePayment(cents, "USD");
    return { ok: res.status === 0, ref: res.txn };       // translate output
  }
}

const gateway: PaymentGateway = new LegacyBankAdapter(new LegacyBank());
gateway.pay(19.99);   // { ok: true, ref: "LB-1999USD" }