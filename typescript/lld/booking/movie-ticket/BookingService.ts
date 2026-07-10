import { Show } from './Show';
import { SeatStatus } from './enums';
import { PricingStrategy } from './PricingStrategy';
import { Booking, BookingStatus } from './Booking';

const HOLD_MS = 5 * 60 * 1000;   // holds live 5 minutes

// Orchestrator. Owns shows + bookings + pricing and runs the atomic hold.
export class BookingService {
    private readonly bookings = new Map<string, Booking>();
    private counter = 0;

    constructor(
        private readonly shows: Map<string, Show>,
        private readonly pricing: PricingStrategy,
    ) {}

    searchShows(movieTitle: string): Show[] {
        return [...this.shows.values()].filter(s => s.movieTitle === movieTitle);
    }

    availableSeats(showId: string, now = Date.now()): string[] {
        const show = this.shows.get(showId);
        if (!show) return [];
        return [...show.seats.values()].filter(s => s.isFree(now)).map(s => s.id);
    }

    // HOLD — reserve seats all-or-nothing. MUST be atomic (one lock / critical
    // section) so two users can't hold the same seat. Returns a bookingId.
    holdSeats(userId: string, showId: string, seatIds: string[], now = Date.now()): Booking | null {
        const show = this.shows.get(showId);
        if (!show) return null;

        const seats = seatIds.map(id => show.seats.get(id));
        if (seats.some(s => !s || !s.isFree(now))) return null;   // any taken → abort

        let amount = 0;
        for (const seat of seats) {
            seat!.status = SeatStatus.HELD;                       // claim
            seat!.heldBy = userId;
            seat!.holdExpiresAt = now + HOLD_MS;
            amount += this.pricing.price(seat!);
        }
        const booking = new Booking('B' + (++this.counter), userId, showId, seatIds, amount);
        this.bookings.set(booking.id, booking);
        return booking;
    }

    // CONFIRM — after payment, promote HELD → BOOKED (only by the holder).
    confirmBooking(bookingId: string, now = Date.now()): boolean {
        const booking = this.bookings.get(bookingId);
        if (!booking || booking.status !== BookingStatus.PENDING) return false;
        const show = this.shows.get(booking.showId)!;

        for (const id of booking.seatIds) {
            const seat = show.seats.get(id)!;
            if (seat.status !== SeatStatus.HELD || seat.heldBy !== booking.userId
                || now > seat.holdExpiresAt) {
                return false;   // hold expired or stolen — payment must refund
            }
        }
        for (const id of booking.seatIds) show.seats.get(id)!.status = SeatStatus.BOOKED;
        booking.status = BookingStatus.CONFIRMED;
        return true;
    }

    // Sweep expired holds back to AVAILABLE (a background job would call this).
    releaseExpired(now = Date.now()): void {
        for (const show of this.shows.values())
            for (const seat of show.seats.values())
                if (seat.status === SeatStatus.HELD && now > seat.holdExpiresAt) {
                    seat.status = SeatStatus.AVAILABLE; seat.heldBy = null;
                }
    }
}