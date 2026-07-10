// A half-open interval [start, end) in minutes-from-midnight. Two meetings
// touching end-to-start (10:00 end, 10:00 start) do NOT conflict.
export class TimeSlot {
    constructor(public readonly start: number, public readonly end: number) {
        if (end <= start) throw new Error('end must be after start');
    }

    overlaps(other: TimeSlot): boolean {
        return this.start < other.end && other.start < this.end;
    }

    duration(): number { return this.end - this.start; }
}