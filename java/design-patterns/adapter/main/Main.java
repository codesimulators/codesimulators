// Pick the implementation in exactly ONE place:
PaymentGateway gateway = new LegacyBankAdapter(new LegacyBank());

// Every caller now speaks the clean interface — no quirks in sight:
new Checkout(gateway).buy(19.99);   // Receipt{ ok=true, ref="LB-1999USD" }
new Refunds(gateway).refund(5.00);

// Switch banks later? Write a StripeAdapter and change ONE line.