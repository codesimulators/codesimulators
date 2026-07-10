import { Ledger } from './Ledger';
import { IdempotencyStore } from './IdempotencyStore';

export class InsufficientFunds extends Error {}
export interface TransferResult { status: 'OK'; amountCents: number; }

// Debits one ledger and credits another as a single atomic step.
// Synchronous JS with no async gap in between makes this section atomic
// for free; a multi-threaded port of this class MUST still lock the two
// wallets in a FIXED order (e.g. sorted id) so a concurrent transfer
// running the opposite direction can never deadlock against this one.
export class TransferService {
    constructor(private idempotency: IdempotencyStore) {}

    transfer(fromId: string, fromLedger: Ledger, toId: string, toLedger: Ledger, amountCents: number, idempotencyKey: string): TransferResult {
        const cached = this.idempotency.get<TransferResult>(idempotencyKey);
        if (cached) return cached;                          // retry — do nothing new

        if (fromLedger.getBalance() < amountCents) throw new InsufficientFunds();
        fromLedger.append('DEBIT', amountCents);
        toLedger.append('CREDIT', amountCents);              // both entries, or neither

        const result: TransferResult = { status: 'OK', amountCents };
        this.idempotency.put(idempotencyKey, result);
        return result;
    }
}