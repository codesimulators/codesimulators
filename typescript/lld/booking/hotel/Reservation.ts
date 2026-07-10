import { DateRange } from './DateRange';
import { ReservationStatus } from './enums';

export class Reservation {
    status: ReservationStatus = ReservationStatus.HELD;
    constructor(
        public readonly id: string,
        public readonly roomNumber: string,
        public readonly guestId: string,
        public readonly range: DateRange,
        public readonly amount: number,
    ) {}
}