import java.util.HashMap;
import java.util.Map;

// Context — the only class callers touch. Holds one strategy + per-client
// state so unrelated clients are never serialized against each other.
public class RateLimiter {
    private final Map<String, ClientState> clientStates = new HashMap<>();
    private final RateLimitStrategy strategy;

    public RateLimiter(RateLimitStrategy strategy) { this.strategy = strategy; }

    public RateLimitStrategy.RateLimitResult isAllowed(String clientId, long now) {
        ClientState state = clientStates.computeIfAbsent(clientId, id -> strategy.initialState());   // starts FULL
        // real code: acquire a per-client lock here before mutating state
        return strategy.tryConsume(state, now);
    }
}