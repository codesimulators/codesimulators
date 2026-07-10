import { PaymentStatus } from './PaymentStatus';

// The persisted lifecycle of one charge — always queryable, never guessed.
export class PaymentRecord {
    status: PaymentStatus = 'CREATED';
    provider?: string;
    attempts = 0;

    constructor(readonly orderId: string, readonly amountCents: number) {}

    markProcessing(): void { this.status = 'PROCESSING'; }
    markSucceeded(provider: string): void { this.status = 'SUCCEEDED'; this.provider = provider; }
    markFailed(): void { this.status = 'FAILED'; }
}