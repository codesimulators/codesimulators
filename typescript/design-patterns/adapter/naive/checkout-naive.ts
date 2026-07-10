class Checkout {
  bank = new LegacyBank();
  buy(amountUsd: number) {
    // ❌ each caller must remember the quirks by hand:
    const cents = Math.round(amountUsd * 100);          // dollars → cents
    const res = this.bank.makePayment(cents, "USD");
    if (res.status !== 0) throw new Error("declined");  // 0 means success (?!)
    return res.txn;
  }
}

class Refunds {
  bank = new LegacyBank();
  refund(amountUsd: number) {
    // ❌ ...and the SAME quirky conversion is copy-pasted here:
    const cents = Math.round(amountUsd * 100);
    const res = this.bank.makePayment(-cents, "USD");
    return res.status === 0;
  }
}
// Swap to a different bank SDK and EVERY caller above breaks at once.