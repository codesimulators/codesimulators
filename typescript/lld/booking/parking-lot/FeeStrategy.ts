// Strategy: pricing is pluggable without touching the lot.
export interface FeeStrategy {
    compute(entryTime: number, exitTime: number): number;
}

export class HourlyFeeStrategy implements FeeStrategy {
    constructor(private readonly ratePerHour: number) {}

    compute(entryTime: number, exitTime: number): number {
        const hours = Math.ceil((exitTime - entryTime) / 3_600_000); // ms → h
        return Math.max(1, hours) * this.ratePerHour;                // min 1h
    }
}