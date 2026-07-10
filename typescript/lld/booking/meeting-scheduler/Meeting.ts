import { TimeSlot } from './TimeSlot';

export class Meeting {
    constructor(
        public readonly id: string,
        public readonly roomId: string,
        public readonly organizer: string,
        public readonly slot: TimeSlot,
        public readonly attendees: number,
    ) {}
}