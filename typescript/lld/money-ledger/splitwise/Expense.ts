import { Split } from './Split';

// Immutable once created — computing shares in the constructor is what
// makes it possible to reject a bad split BEFORE it ever touches the ledger.
export class Expense {
    readonly shares: Map<string, number>;

    constructor(
        readonly id: string,
        readonly paidBy: string,
        readonly totalCents: number,
        readonly participantIds: string[],
        split: Split,
    ) {
        this.shares = split.computeShares(totalCents, participantIds);
    }
}