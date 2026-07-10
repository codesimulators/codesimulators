class TimeSlot:
    # Half-open interval [start, end) in minutes-from-midnight.
    def __init__(self, start: int, end: int):
        if end <= start:
            raise ValueError("end must be after start")
        self.start = start
        self.end = end

    def overlaps(self, other: "TimeSlot") -> bool:
        return self.start < other.end and other.start < self.end

    def duration(self) -> int:
        return self.end - self.start


class Room:
    def __init__(self, room_id: str, capacity: int):
        self.id = room_id
        self.capacity = capacity


class Meeting:
    def __init__(self, meeting_id: str, room_id: str, organizer: str,
                 slot: TimeSlot, attendees: int):
        self.id = meeting_id
        self.room_id = room_id
        self.organizer = organizer
        self.slot = slot
        self.attendees = attendees