import { Room } from './Room';
import { DateRange } from './DateRange';
import { RoomType } from './enums';
import { SeasonalPricing } from './PricingStrategy';
import { HotelService } from './HotelService';

const DAY = 86_400_000;
const t0 = Date.now();

const svc = new HotelService(
    [new Room('101', RoomType.DELUXE), new Room('102', RoomType.DELUXE)],
    new SeasonalPricing({ [RoomType.STANDARD]: 80, [RoomType.DELUXE]: 140, [RoomType.SUITE]: 300 }),
);

const stay = new DateRange(t0, t0 + 3 * DAY);            // 3 nights
const res = svc.book('g1', RoomType.DELUXE, stay);
console.log(res ? 'Booked ' + res.roomNumber + ' for $' + res.amount : 'Sold out');

// Overlapping request for the SAME dates gets the OTHER deluxe (102), not 101.
const res2 = svc.book('g2', RoomType.DELUXE, new DateRange(t0 + DAY, t0 + 2 * DAY));
console.log('g2 room:', res2?.roomNumber);              // 102

console.log('Confirm g1:', svc.confirm(res!.id));       // true