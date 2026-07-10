// The contract every payment method must honor.
export interface PaymentStrategy {
  // Given an amount, return the total the buyer pays.
  charge(amount: number): number;
}