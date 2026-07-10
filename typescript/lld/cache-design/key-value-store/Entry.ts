// An immutable-ish snapshot of one stored value: what it holds, when it
// expires, and a version counter for optimistic-concurrency writes.
export interface Entry<V> {
    value: V;
    expiresAt: number;
    version: number;
}