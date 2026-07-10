// What our app WANTS to depend on.
interface PaymentGateway {
  pay(amountUsd: number): { ok: boolean; ref: string };
}