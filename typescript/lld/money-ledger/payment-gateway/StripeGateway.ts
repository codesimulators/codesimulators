import { PaymentGateway, ProviderResult, TransientProviderError } from './PaymentGateway';

// Translates our interface into Stripe's actual SDK. Simulated here to
// always exhaust its retry budget, so the demo can show a same-provider
// retry followed by a failover.
export class StripeGateway implements PaymentGateway {
    readonly name = 'Stripe';
    private failuresLeft = 3;

    charge(amountCents: number, idempotencyKey: string): ProviderResult {
        if (this.failuresLeft-- > 0) throw new TransientProviderError('Stripe timeout');
        return { providerRef: `stripe_${idempotencyKey}` };
    }
}