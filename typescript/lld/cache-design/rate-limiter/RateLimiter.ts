import { ClientState } from './ClientState';
import { RateLimitResult, RateLimitStrategy } from './RateLimitStrategy';

// Context — the only class callers touch. Holds one strategy + per-client
// state so unrelated clients are never serialized against each other.
export class RateLimiter {
    private clientStates = new Map<string, ClientState>();

    constructor(private strategy: RateLimitStrategy) {}

    isAllowed(clientId: string, now: number = Date.now()): RateLimitResult {
        let state = this.clientStates.get(clientId);
        if (!state) {
            state = this.strategy.initialState();               // starts FULL, not empty
            this.clientStates.set(clientId, state);
        }
        // real code: acquire a per-client lock here before mutating state
        return this.strategy.tryConsume(state, now);
    }
}