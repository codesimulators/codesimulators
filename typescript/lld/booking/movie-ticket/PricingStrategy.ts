import { ShowSeat } from './ShowSeat';
import { SeatType } from './enums';

// Strategy: pricing is pluggable (flat, weekend, dynamic) without touching
// the booking service.
export interface PricingStrategy {
    price(seat: ShowSeat): number;
}

export class TieredPricing implements PricingStrategy {
    constructor(private readonly rates: Record<SeatType, number>) {}
    price(seat: ShowSeat): number { return this.rates[seat.type]; }
}