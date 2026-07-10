// Strategy interface: turn a total (in cents) + participant list into a
// validated per-person share map. Every concrete split must sum EXACTLY
// back to the total — no float remainders.
export interface Split {
    computeShares(totalCents: number, participantIds: string[]): Map<string, number>;
}