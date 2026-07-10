// Caches the result of the FIRST call under a given key. Every retry with
// the same key returns that cached result instead of re-running anything.
export class IdempotencyStore {
    private results = new Map<string, unknown>();

    get<T>(key: string): T | undefined {
        return this.results.get(key) as T | undefined;
    }

    put<T>(key: string, result: T): void {
        this.results.set(key, result);
    }
}