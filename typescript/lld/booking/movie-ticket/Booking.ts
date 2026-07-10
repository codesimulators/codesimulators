export enum BookingStatus { PENDING, CONFIRMED, CANCELLED }

export class Booking {
    status = BookingStatus.PENDING;
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly showId: string,
        public readonly seatIds: string[],
        public readonly amount: number,
    ) {}
}