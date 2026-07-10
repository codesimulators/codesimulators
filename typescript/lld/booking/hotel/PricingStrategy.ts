import { Room } from './Room';
import { RoomType } from './enums';

// Strategy: nightly rate is pluggable (seasonal, weekend, dynamic).
export interface PricingStrategy {
    perNight(room: Room): number;
}

export class SeasonalPricing implements PricingStrategy {
    constructor(private readonly rates: Record<RoomType, number>) {}
    perNight(room: Room): number { return this.rates[room.type]; }
}