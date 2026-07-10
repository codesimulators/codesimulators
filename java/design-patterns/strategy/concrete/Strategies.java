public class CardStrategy implements PaymentStrategy {
    public double charge(double amount) {
        return amount + amount * 0.029 + 0.30;
    }
}

public class PaypalStrategy implements PaymentStrategy {
    public double charge(double amount) {
        return amount + amount * 0.0349 + 0.49;
    }
}

public class CryptoStrategy implements PaymentStrategy {
    public double charge(double amount) {
        return amount + amount * 0.01;  // 1% network fee
    }
}