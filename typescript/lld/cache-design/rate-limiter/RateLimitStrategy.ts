import { ClientState } from './ClientState';

export interface RateLimitResult { allowed: boolean; retryAfterMs?: number; }

// Strategy: the swappable throttling algorithm. RateLimiter never branches
// on which one is active — it only ever calls tryConsume().
export interface RateLimitStrategy {
    tryConsume(state: ClientState, now: number): RateLimitResult;
    initialState(): ClientState;
}