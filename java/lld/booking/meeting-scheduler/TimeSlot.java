// Half-open interval [start, end) in minutes-from-midnight.
public class TimeSlot {
    public final int start, end;
    public TimeSlot(int start, int end) {
        if (end <= start) throw new IllegalArgumentException("end after start");
        this.start = start; this.end = end;
    }
    public boolean overlaps(TimeSlot o) { return start < o.end && o.start < end; }
    public int duration() { return end - start; }
}