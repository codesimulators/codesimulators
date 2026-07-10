public class TokenBucketStrategy implements RateLimitStrategy {
    private final int capacity;
    private final double refillPerMs;

    public TokenBucketStrategy(int capacity, double refillPerMs) {
        this.capacity = capacity;
        this.refillPerMs = refillPerMs;
    }

    @Override
    public ClientState initialState() {
        ClientState s = new ClientState();
        s.tokens = capacity;
        s.lastRefill = System.currentTimeMillis();
        return s;
    }

    // Tokens refill continuously up to a cap; a request consumes one if
    // available. Bursts are bounded by the cap, not by a hard window edge.
    @Override
    public RateLimitResult tryConsume(ClientState state, long now) {
        long elapsed = Math.max(0, now - state.lastRefill);          // clamp — clock can't go backward
        state.tokens = Math.min(capacity, state.tokens + elapsed * refillPerMs);
        state.lastRefill = now;

        if (state.tokens < 1) {
            long retryAfterMs = (long) Math.ceil((1 - state.tokens) / refillPerMs);
            return new RateLimitResult(false, retryAfterMs);
        }
        state.tokens -= 1;
        return new RateLimitResult(true, 0);
    }
}