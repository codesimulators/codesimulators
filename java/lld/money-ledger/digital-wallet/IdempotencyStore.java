import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// Caches the result of the FIRST call under a given key. Every retry with
// the same key returns that cached result instead of re-running anything.
public class IdempotencyStore {
    private final Map<String, Object> results = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public <T> T get(String key) { return (T) results.get(key); }

    public <T> void put(String key, T result) { results.put(key, result); }
}