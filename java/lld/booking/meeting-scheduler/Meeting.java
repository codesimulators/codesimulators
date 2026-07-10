public class Meeting {
    public final String id, roomId, organizer;
    public final TimeSlot slot;
    public final int attendees;
    public Meeting(String id, String roomId, String organizer, TimeSlot slot, int attendees) {
        this.id = id; this.roomId = roomId; this.organizer = organizer;
        this.slot = slot; this.attendees = attendees;
    }
}