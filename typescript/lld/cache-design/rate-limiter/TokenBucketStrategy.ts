import { ClientState } from './ClientState';
import { RateLimitStrategy, RateLimitResult } from './RateLimitStrategy';

// Tokens refill continuously up to a cap; a request consumes one if
// available. Bursts are bounded by the cap, not by a hard window edge.
export class TokenBucketStrategy implements RateLimitStrategy {
    constructor(private capacity: number, private refillPerMs: number) {}

    initialState(): ClientState {
        return { tokens: this.capacity, lastRefill: Date.now() };
    }

    tryConsume(state: ClientState, now: number): RateLimitResult {
        const elapsed = Math.max(0, now - (state.lastRefill ?? now));   // clamp — clock can't go backward
        state.tokens = Math.min(this.capacity, (state.tokens ?? 0) + elapsed * this.refillPerMs);
        state.lastRefill = now;

        if (state.tokens < 1) {
            const retryAfterMs = Math.ceil((1 - state.tokens) / this.refillPerMs);
            return { allowed: false, retryAfterMs };
        }
        state.tokens -= 1;
        return { allowed: true };
    }
}