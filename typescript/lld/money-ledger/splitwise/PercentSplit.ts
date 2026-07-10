import { Split } from './Split';

// Percentages must sum to 100; cents are floored per person and the
// leftover pennies handed out the same deterministic way as EqualSplit.
export class PercentSplit implements Split {
    constructor(private percentages: Map<string, number>) {}

    computeShares(totalCents: number, participantIds: string[]): Map<string, number> {
        let pctSum = 0;
        for (const id of participantIds) pctSum += this.percentages.get(id) ?? 0;
        if (pctSum !== 100) throw new Error(`percentages (${pctSum}) must sum to 100`);

        const base = participantIds.map(id => Math.floor((totalCents * this.percentages.get(id)!) / 100));
        let remainder = totalCents - base.reduce((a, b) => a + b, 0);

        const shares = new Map<string, number>();
        participantIds.forEach((id, i) => {
            const bump = remainder > 0 ? 1 : 0;
            shares.set(id, base[i] + bump);
            if (bump) remainder--;
        });
        return shares;
    }
}