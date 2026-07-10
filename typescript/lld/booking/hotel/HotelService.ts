import { Room } from './Room';
import { DateRange } from './DateRange';
import { RoomType, ReservationStatus } from './enums';
import { Reservation } from './Reservation';
import { PricingStrategy } from './PricingStrategy';

// Orchestrator. Owns rooms + reservations + pricing and answers the
// interval-overlap availability question.
export class HotelService {
    private readonly reservations = new Map<string, Reservation>();
    private counter = 0;

    constructor(
        private readonly rooms: Room[],
        private readonly pricing: PricingStrategy,
    ) {}

    // A room is free for 'range' iff NO active reservation on it overlaps.
    private isFree(roomNumber: string, range: DateRange): boolean {
        for (const r of this.reservations.values())
            if (r.roomNumber === roomNumber
                && r.status !== ReservationStatus.CANCELLED
                && r.range.overlaps(range))
                return false;
        return true;
    }

    search(type: RoomType, range: DateRange): Room[] {
        return this.rooms.filter(room => room.type === type && this.isFree(room.number, range));
    }

    // BOOK — pick a free room of the type and hold it for the range. The
    // find-then-hold pair MUST be atomic so two guests can't grab the same
    // room for overlapping dates.
    book(guestId: string, type: RoomType, range: DateRange): Reservation | null {
        const room = this.rooms.find(r => r.type === type && this.isFree(r.number, range));
        if (!room) return null;                                   // sold out for dates

        const amount = this.pricing.perNight(room) * range.nights();
        const res = new Reservation('R' + (++this.counter), room.number, guestId, range, amount);
        this.reservations.set(res.id, res);                       // HELD claims the interval
        return res;
    }

    confirm(reservationId: string): boolean {
        const res = this.reservations.get(reservationId);
        if (!res || res.status !== ReservationStatus.HELD) return false;
        res.status = ReservationStatus.CONFIRMED;
        return true;
    }
}