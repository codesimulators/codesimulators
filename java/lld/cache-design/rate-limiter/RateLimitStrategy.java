// Strategy: the swappable throttling algorithm. RateLimiter never branches
// on which one is active — it only ever calls tryConsume().
public interface RateLimitStrategy {
    RateLimitResult tryConsume(ClientState state, long now);
    ClientState initialState();

    class RateLimitResult {
        public final boolean allowed;
        public final long retryAfterMs;

        public RateLimitResult(boolean allowed, long retryAfterMs) {
            this.allowed = allowed;
            this.retryAfterMs = retryAfterMs;
        }
    }
}