import { KVStore } from './KVStore';

// Proactively reclaims expired keys — but re-checks each key's LIVE expiry
// before deleting, so a key renewed after being scheduled survives its
// stale heap entry firing.
export class Sweeper<V> {
    constructor(private store: KVStore<V>) {}

    tick(now: number = Date.now()): void {
        while (true) {
            const next = this.store.expiryQueue.peek();
            if (!next || next.expiresAt > now) break;
            this.store.expiryQueue.pop();

            const live = this.store.peekLive(next.key);
            if (live && live.expiresAt <= now) {
                this.store.forceDelete(next.key);       // still actually expired
            }
            // else: key was renewed with a later TTL after this entry was scheduled — skip
        }
    }
}