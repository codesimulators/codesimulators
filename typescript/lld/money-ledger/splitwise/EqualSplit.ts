import { Split } from './Split';

// Floors the per-person share, then hands the leftover pennies to the
// first participants in a fixed order — deterministic, never a float.
export class EqualSplit implements Split {
    computeShares(totalCents: number, participantIds: string[]): Map<string, number> {
        const n = participantIds.length;
        const base = Math.floor(totalCents / n);
        const remainder = totalCents - base * n;

        const shares = new Map<string, number>();
        participantIds.forEach((id, i) => {
            shares.set(id, base + (i < remainder ? 1 : 0));
        });
        return shares;
    }
}