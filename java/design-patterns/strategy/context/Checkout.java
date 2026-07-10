public class Checkout {
    private PaymentStrategy strategy;

    public Checkout(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public double pay(double amount) {
        return strategy.charge(amount);   // pure delegation
    }
}

// ── Client ──
Checkout cart = new Checkout(new CardStrategy());
cart.pay(100);                 // 103.20

cart.setStrategy(new CryptoStrategy());
cart.pay(100);                 // 101.00