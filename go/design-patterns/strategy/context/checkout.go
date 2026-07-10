type Checkout struct {
    strategy PaymentStrategy
}

func (c *Checkout) SetStrategy(s PaymentStrategy) {
    c.strategy = s
}

func (c *Checkout) Pay(amount float64) float64 {
    return c.strategy.Charge(amount) // pure delegation
}

// ── Client ──
cart := &Checkout{strategy: CardStrategy{}}
cart.Pay(100)                  // 103.20

cart.SetStrategy(CryptoStrategy{})
cart.Pay(100)                  // 101.00