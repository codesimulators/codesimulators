public class Sweeper<V> {
    private final KVStore<V> store;

    public Sweeper(KVStore<V> store) { this.store = store; }

    // Proactively reclaims expired keys — but re-checks each key's LIVE
    // expiry before deleting, so a key renewed after being scheduled
    // survives its stale heap entry firing.
    public void tick(long now) {
        while (true) {
            ExpiryQueue.QueueItem next = store.expiryQueue.peek();
            if (next == null || next.expiresAt > now) break;
            store.expiryQueue.pop();

            Entry<V> live = store.peekLive(next.key);
            if (live != null && live.expiresAt <= now) {
                store.forceDelete(next.key);       // still actually expired
            }
            // else: key was renewed with a later TTL after this entry was scheduled — skip
        }
    }
}