import { Split } from './Split';

// Caller supplies the exact cents each participant owes; we only verify
// they add up — this split never invents a number.
export class ExactSplit implements Split {
    constructor(private amounts: Map<string, number>) {}

    computeShares(totalCents: number, participantIds: string[]): Map<string, number> {
        let sum = 0;
        for (const id of participantIds) sum += this.amounts.get(id) ?? 0;
        if (sum !== totalCents) {
            throw new Error(`exact shares (${sum}) must sum to total (${totalCents})`);
        }
        return new Map(participantIds.map(id => [id, this.amounts.get(id)!]));
    }
}