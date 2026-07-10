import { PaymentGateway, ProviderResult } from './PaymentGateway';

// A second adapter — succeeds immediately, standing in as the failover target.
export class RazorpayGateway implements PaymentGateway {
    readonly name = 'Razorpay';

    charge(amountCents: number, idempotencyKey: string): ProviderResult {
        return { providerRef: `razorpay_${idempotencyKey}` };
    }
}