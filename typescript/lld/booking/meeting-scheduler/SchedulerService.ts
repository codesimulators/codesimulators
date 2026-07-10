import { Room } from './Room';
import { TimeSlot } from './TimeSlot';
import { Meeting } from './Meeting';

// Orchestrator. Owns rooms + each room's meetings, sorted by start time.
export class SchedulerService {
    private readonly byRoom = new Map<string, Meeting[]>();   // roomId -> sorted meetings
    private counter = 0;

    constructor(private readonly rooms: Room[]) {
        for (const r of rooms) this.byRoom.set(r.id, []);
    }

    private conflicts(roomId: string, slot: TimeSlot): boolean {
        return this.byRoom.get(roomId)!.some(m => m.slot.overlaps(slot));
    }

    // BOOK a specific room+slot for N attendees. Atomic check-then-insert so
    // two organizers can't grab the same room+slot.
    book(roomId: string, organizer: string, slot: TimeSlot, attendees: number): Meeting | null {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room || attendees > room.capacity) return null;      // too small
        if (this.conflicts(roomId, slot)) return null;            // double-booked

        const meeting = new Meeting('M' + (++this.counter), roomId, organizer, slot, attendees);
        const list = this.byRoom.get(roomId)!;
        list.push(meeting);
        list.sort((a, b) => a.slot.start - b.slot.start);         // keep sorted
        return meeting;
    }

    // Any room that fits the party AND is free for the slot.
    findRoom(slot: TimeSlot, attendees: number): Room | null {
        return this.rooms.find(r => r.capacity >= attendees && !this.conflicts(r.id, slot)) ?? null;
    }

    // SUGGEST — earliest slot of 'duration' in [from, until) on this room.
    // Walk the sorted meetings; the first gap wide enough wins.
    suggestNextSlot(roomId: string, duration: number, from: number, until: number): TimeSlot | null {
        let cursor = from;
        for (const m of this.byRoom.get(roomId)!) {
            if (m.slot.end <= cursor) continue;                   // already past
            if (m.slot.start - cursor >= duration)                // gap fits
                return new TimeSlot(cursor, cursor + duration);
            cursor = Math.max(cursor, m.slot.end);                // jump past the meeting
        }
        if (until - cursor >= duration) return new TimeSlot(cursor, cursor + duration);
        return null;                                              // no gap today
    }
}