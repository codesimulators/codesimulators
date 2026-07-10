public interface PaymentStrategy {
    // Given an amount, return the total the buyer pays.
    double charge(double amount);
}