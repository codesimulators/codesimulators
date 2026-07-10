// Each algorithm lives alone. One reason to change, one file.
export class CardStrategy implements PaymentStrategy {
  charge(amount: number) {
    return amount + amount * 0.029 + 0.30;
  }
}

export class PaypalStrategy implements PaymentStrategy {
  charge(amount: number) {
    return amount + amount * 0.0349 + 0.49;
  }
}

export class CryptoStrategy implements PaymentStrategy {
  charge(amount: number) {
    return amount + amount * 0.01;   // 1% network fee
  }
}