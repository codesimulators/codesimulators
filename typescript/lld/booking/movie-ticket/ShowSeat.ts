import { SeatType, SeatStatus } from './enums';

// Inventory unit. Knows its own status + who holds it and until when.
export class ShowSeat {
    status: SeatStatus = SeatStatus.AVAILABLE;
    heldBy: string | null = null;
    holdExpiresAt = 0;

    constructor(
        public readonly id: string,
        public readonly type: SeatType,
    ) {}

    isFree(now: number): boolean {
        // A held seat whose hold has expired is free again.
        if (this.status === SeatStatus.HELD && now > this.holdExpiresAt) return true;
        return this.status === SeatStatus.AVAILABLE;
    }
}