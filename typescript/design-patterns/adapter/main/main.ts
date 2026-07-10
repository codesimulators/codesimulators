// Pick the implementation in exactly ONE place:
const gateway: PaymentGateway = new LegacyBankAdapter(new LegacyBank());

// Every caller now speaks the clean interface — no quirks in sight:
new Checkout(gateway).buy(19.99);   // { ok: true, ref: "LB-1999USD" }
new Refunds(gateway).refund(5.00);

// Switch banks later? Write a StripeAdapter and change ONE line:
//   const gateway = new StripeAdapter(new StripeSdk());
// Checkout, Refunds, and every other caller are untouched.