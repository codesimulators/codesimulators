export type EntryType = 'CREDIT' | 'DEBIT';

// An immutable fact: this wallet was credited/debited this many cents.
export interface LedgerEntry {
    type: EntryType;
    amountCents: number;
    timestamp: number;
}