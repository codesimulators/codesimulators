import { ClientState } from './ClientState';
import { RateLimitStrategy, RateLimitResult } from './RateLimitStrategy';

// Keeps an exact timestamp log of requests in the trailing window — no
// boundary effect, at the cost of memory proportional to traffic.
export class SlidingWindowStrategy implements RateLimitStrategy {
    constructor(private limit: number, private windowMs: number) {}

    initialState(): ClientState {
        return { requestLog: [] };
    }

    tryConsume(state: ClientState, now: number): RateLimitResult {
        const log = (state.requestLog ??= []);
        while (log.length && now - log[0] > this.windowMs) log.shift();   // drop entries outside the window

        if (log.length >= this.limit) {
            const retryAfterMs = this.windowMs - (now - log[0]);
            return { allowed: false, retryAfterMs };
        }
        log.push(now);
        return { allowed: true };
    }
}