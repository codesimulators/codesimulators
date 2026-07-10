// Pick the implementation in exactly ONE place:
var gateway PaymentGateway = LegacyBankAdapter{bank: LegacyBank{}}

// Every caller now speaks the clean interface — no quirks in sight:
NewCheckout(gateway).Buy(19.99)   // ok=true, ref="LB-1999USD"
NewRefunds(gateway).Refund(5.00)

// Switch banks later? Write a StripeAdapter and change ONE line.