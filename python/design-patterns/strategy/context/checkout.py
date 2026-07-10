class Checkout:
    def __init__(self, strategy: PaymentStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: PaymentStrategy):
        self._strategy = strategy

    def pay(self, amount: float) -> float:
        return self._strategy.charge(amount)   # pure delegation

# ── Client ──
cart = Checkout(CardStrategy())
cart.pay(100)                  # 103.20 via card

cart.set_strategy(CryptoStrategy())
cart.pay(100)                  # 101.00 via crypto