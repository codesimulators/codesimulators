import java.util.HashMap;
import java.util.Map;

public class KVStore<V> {

    public static class StaleWrite extends RuntimeException {}

    private final Map<String, Entry<V>> entries = new HashMap<>();
    public final ExpiryQueue expiryQueue = new ExpiryQueue();

    // The map + operations. The lazy check on get() backstops the
    // proactive Sweeper — a key is never returned past its expiry,
    // whichever runs first.
    public void set(String key, V value, long ttlMs) {
        long expiresAt = System.currentTimeMillis() + ttlMs;
        int prevVersion = entries.containsKey(key) ? entries.get(key).version : 0;
        entries.put(key, new Entry<>(value, expiresAt, prevVersion + 1));
        expiryQueue.schedule(key, expiresAt);
    }

    public V get(String key) {
        Entry<V> entry = entries.get(key);
        if (entry == null) return null;
        if (System.currentTimeMillis() > entry.expiresAt) { entries.remove(key); return null; }   // lazy check
        return entry.value;
    }

    public void delete(String key) { entries.remove(key); }

    public void compareAndSet(String key, int expectedVersion, V value, long ttlMs) {
        Entry<V> current = entries.get(key);
        int currentVersion = current == null ? 0 : current.version;
        if (currentVersion != expectedVersion) throw new StaleWrite();
        set(key, value, ttlMs);
    }

    public Entry<V> peekLive(String key) { return entries.get(key); }
    public void forceDelete(String key) { entries.remove(key); }
}