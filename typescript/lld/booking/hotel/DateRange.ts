// A half-open interval [checkIn, checkOut). Checkout day frees the room, so
// one guest's checkout can be another's check-in — that's why it's half-open.
export class DateRange {
    constructor(public readonly checkIn: number, public readonly checkOut: number) {
        if (checkOut <= checkIn) throw new Error('checkOut must be after checkIn');
    }

    // The one line the whole design turns on:
    overlaps(other: DateRange): boolean {
        return this.checkIn < other.checkOut && other.checkIn < this.checkOut;
    }

    nights(): number { return Math.round((this.checkOut - this.checkIn) / 86_400_000); }
}