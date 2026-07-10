import java.util.PriorityQueue;

// A min-heap keyed by expiry time. The sweeper only ever looks at the
// earliest entry — it never scans keys that aren't due yet.
public class ExpiryQueue {

    public static class QueueItem {
        public final String key;
        public final long expiresAt;
        public QueueItem(String key, long expiresAt) { this.key = key; this.expiresAt = expiresAt; }
    }

    private final PriorityQueue<QueueItem> heap = new PriorityQueue<>((a, b) -> Long.compare(a.expiresAt, b.expiresAt));

    public void schedule(String key, long expiresAt) { heap.add(new QueueItem(key, expiresAt)); }
    public QueueItem peek() { return heap.peek(); }
    public QueueItem pop() { return heap.poll(); }
}