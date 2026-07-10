// The context holds a strategy and delegates — it never
// asks "which one are you?". Swap it at runtime, freely.
export class Checkout {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  pay(amount: number): number {
    return this.strategy.charge(amount);   // pure delegation
  }
}

// ── Client ──
const cart = new Checkout(new CardStrategy());
cart.pay(100);                 // 103.20 via card

cart.setStrategy(new CryptoStrategy());
cart.pay(100);                 // 101.00 via crypto — no code changed