import threading
from typing import Dict, List, Optional
from models import Room, TimeSlot, Meeting


# Orchestrator. Each room's meetings kept sorted by start time.
class SchedulerService:
    def __init__(self, rooms: List[Room]):
        self._rooms = rooms
        self._by_room: Dict[str, List[Meeting]] = {r.id: [] for r in rooms}
        self._counter = 0
        self._lock = threading.Lock()

    def _conflicts(self, room_id: str, slot: TimeSlot) -> bool:
        return any(m.slot.overlaps(slot) for m in self._by_room[room_id])

    def book(self, room_id: str, organizer: str,
             slot: TimeSlot, attendees: int) -> Optional[Meeting]:
        with self._lock:
            room = next((r for r in self._rooms if r.id == room_id), None)
            if room is None or attendees > room.capacity:
                return None
            if self._conflicts(room_id, slot):
                return None
            self._counter += 1
            m = Meeting(f"M{self._counter}", room_id, organizer, slot, attendees)
            self._by_room[room_id].append(m)
            self._by_room[room_id].sort(key=lambda x: x.slot.start)
            return m

    def find_room(self, slot: TimeSlot, attendees: int) -> Optional[Room]:
        return next((r for r in self._rooms
                     if r.capacity >= attendees and not self._conflicts(r.id, slot)), None)

    # SUGGEST — earliest gap of 'duration' in [from_, until).
    def suggest_next_slot(self, room_id: str, duration: int,
                          from_: int, until: int) -> Optional[TimeSlot]:
        cursor = from_
        for m in self._by_room[room_id]:
            if m.slot.end <= cursor:
                continue
            if m.slot.start - cursor >= duration:
                return TimeSlot(cursor, cursor + duration)
            cursor = max(cursor, m.slot.end)
        if until - cursor >= duration:
            return TimeSlot(cursor, cursor + duration)
        return None