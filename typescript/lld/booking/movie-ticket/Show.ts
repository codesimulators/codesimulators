import { ShowSeat } from './ShowSeat';

// A screening: one movie, one screen, one start time, its own seat map.
export class Show {
    constructor(
        public readonly id: string,
        public readonly movieTitle: string,
        public readonly screen: string,
        public readonly startTime: number,
        public readonly seats: Map<string, ShowSeat>,   // seatId -> ShowSeat
    ) {}
}