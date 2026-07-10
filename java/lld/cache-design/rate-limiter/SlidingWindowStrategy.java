public class SlidingWindowStrategy implements RateLimitStrategy {
    private final int limit;
    private final long windowMs;

    public SlidingWindowStrategy(int limit, long windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
    }

    @Override
    public ClientState initialState() { return new ClientState(); }

    // Keeps an exact timestamp log of requests in the trailing window — no
    // boundary effect, at the cost of memory proportional to traffic.
    @Override
    public RateLimitResult tryConsume(ClientState state, long now) {
        while (!state.requestLog.isEmpty() && now - state.requestLog.peekFirst() > windowMs) {
            state.requestLog.pollFirst();                              // drop entries outside the window
        }
        if (state.requestLog.size() >= limit) {
            long retryAfterMs = windowMs - (now - state.requestLog.peekFirst());
            return new RateLimitResult(false, retryAfterMs);
        }
        state.requestLog.addLast(now);
        return new RateLimitResult(true, 0);
    }
}