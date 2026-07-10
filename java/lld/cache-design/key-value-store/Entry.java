// An immutable-ish snapshot of one stored value: what it holds, when it
// expires, and a version counter for optimistic-concurrency writes.
public class Entry<V> {
    public final V value;
    public final long expiresAt;
    public final int version;

    public Entry(V value, long expiresAt, int version) {
        this.value = value; this.expiresAt = expiresAt; this.version = version;
    }
}