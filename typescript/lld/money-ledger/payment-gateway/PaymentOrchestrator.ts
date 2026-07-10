import { PaymentGateway, ProviderResult, TransientProviderError } from './PaymentGateway';
import { RetryPolicy } from './RetryPolicy';
import { PaymentRecord } from './PaymentRecord';

export interface PaymentResult { status: 'SUCCEEDED'; provider: string; providerRef: string; }
export class AllProvidersFailed extends Error {}

// Facade — walks the provider chain, applies the retry policy per provider,
// updates the persisted status, and checks idempotency before touching
// anything. Never imports a provider SDK directly.
export class PaymentOrchestrator {
    private idempotency = new Map<string, PaymentResult>();
    private records = new Map<string, PaymentRecord>();

    constructor(private providers: PaymentGateway[], private retryPolicy: RetryPolicy) {}

    charge(orderId: string, amountCents: number, idempotencyKey: string): PaymentResult {
        const cached = this.idempotency.get(idempotencyKey);
        if (cached) return cached;                          // retry — do nothing new

        const record = new PaymentRecord(orderId, amountCents);
        record.markProcessing();
        this.records.set(idempotencyKey, record);

        for (const provider of this.providers) {
            for (let attempt = 1; attempt <= this.retryPolicy.maxAttempts; attempt++) {
                record.attempts++;
                try {
                    const providerResult: ProviderResult = provider.charge(amountCents, idempotencyKey);
                    record.markSucceeded(provider.name);
                    const result: PaymentResult = { status: 'SUCCEEDED', provider: provider.name, providerRef: providerResult.providerRef };
                    this.idempotency.set(idempotencyKey, result);
                    return result;
                } catch (err) {
                    const transient = err instanceof TransientProviderError;
                    if (!transient || attempt === this.retryPolicy.maxAttempts) break;   // exhausted this provider
                    // real code: sleep(this.retryPolicy.backoffMs(attempt)) before the next attempt
                }
            }
            // fall through — try the next provider in the chain
        }

        record.markFailed();
        throw new AllProvidersFailed();
    }

    statusOf(idempotencyKey: string): PaymentRecord | undefined {
        return this.records.get(idempotencyKey);
    }
}