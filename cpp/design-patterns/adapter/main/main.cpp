// Pick the implementation in exactly ONE place:
auto gateway = std::make_unique<LegacyBankAdapter>(LegacyBank{});

// Every caller now speaks the clean interface — no quirks in sight:
Checkout(*gateway).buy(19.99);   // { ok: true, ref: "LB-1999USD" }
Refunds(*gateway).refund(5.00);

// Switch banks later? Write a StripeAdapter and change ONE line.