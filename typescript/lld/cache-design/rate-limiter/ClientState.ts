// One client's throttling state. Shape depends on the strategy in use —
// a token bucket needs tokens+lastRefill; a sliding window needs a log.
export interface ClientState {
    tokens?: number;
    lastRefill?: number;
    requestLog?: number[];
}