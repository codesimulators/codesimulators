import { LedgerEntry, EntryType } from './LedgerEntry';

// Append-only per-wallet log. Balance is a fold over the entries, kept as
// a running cache so getBalance() doesn't replay the whole history — but
// the cache is only ever UPDATED by append(), never set directly.
export class Ledger {
    private entries: LedgerEntry[] = [];
    private cachedBalance = 0;

    append(type: EntryType, amountCents: number): void {
        this.entries.push({ type, amountCents, timestamp: Date.now() });
        this.cachedBalance += type === 'CREDIT' ? amountCents : -amountCents;
    }

    getBalance(): number {
        return this.cachedBalance;
    }

    history(): readonly LedgerEntry[] {
        return this.entries;
    }
}