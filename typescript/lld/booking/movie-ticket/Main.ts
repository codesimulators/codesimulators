import { Show } from './Show';
import { ShowSeat } from './ShowSeat';
import { SeatType } from './enums';
import { TieredPricing } from './PricingStrategy';
import { BookingService } from './BookingService';

const seats = new Map<string, ShowSeat>([
    ['A1', new ShowSeat('A1', SeatType.PREMIUM)],
    ['A2', new ShowSeat('A2', SeatType.PREMIUM)],
    ['B1', new ShowSeat('B1', SeatType.REGULAR)],
]);
const show = new Show('S1', 'Dune', 'Screen 1', Date.now() + 3_600_000, seats);

const svc = new BookingService(
    new Map([[show.id, show]]),
    new TieredPricing({ [SeatType.REGULAR]: 200, [SeatType.PREMIUM]: 350 }),
);

const booking = svc.holdSeats('u1', 'S1', ['A1', 'A2']);
console.log(booking ? 'Held ' + booking.seatIds + ' for $' + booking.amount : 'Seats gone');

// A second user racing for A1 now fails — it is HELD.
console.log('u2 hold A1:', svc.holdSeats('u2', 'S1', ['A1']) ? 'ok' : 'rejected');

console.log('Payment ok, confirm:', svc.confirmBooking(booking!.id));  // true