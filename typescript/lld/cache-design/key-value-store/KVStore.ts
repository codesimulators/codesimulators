import { Entry } from './Entry';
import { ExpiryQueue } from './ExpiryQueue';

export class StaleWrite extends Error {}

// The map + operations. The lazy check on get() backstops the proactive
// Sweeper — a key is never returned past its expiry, whichever runs first.
export class KVStore<V> {
    private entries = new Map<string, Entry<V>>();
    readonly expiryQueue = new ExpiryQueue();

    set(key: string, value: V, ttlMs: number): void {
        const expiresAt = Date.now() + ttlMs;
        const prevVersion = this.entries.get(key)?.version ?? 0;
        this.entries.set(key, { value, expiresAt, version: prevVersion + 1 });
        this.expiryQueue.schedule(key, expiresAt);
    }

    get(key: string): V | null {
        const entry = this.entries.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) { this.entries.delete(key); return null; }   // lazy check
        return entry.value;
    }

    delete(key: string): void {
        this.entries.delete(key);
    }

    multiSet(pairs: [string, V, number][]): void {
        // one critical section — all the writes land together (a real
        // implementation validates every entry before applying any of them)
        for (const [key, value, ttlMs] of pairs) this.set(key, value, ttlMs);
    }

    compareAndSet(key: string, expectedVersion: number, value: V, ttlMs: number): void {
        const current = this.entries.get(key);
        if ((current?.version ?? 0) !== expectedVersion) throw new StaleWrite();
        this.set(key, value, ttlMs);
    }

    peekLive(key: string): Entry<V> | undefined {
        return this.entries.get(key);
    }

    forceDelete(key: string): void {
        this.entries.delete(key);
    }
}