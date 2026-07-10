// Strategy: how many attempts per provider, and how long to back off between
// them. Independent of any one provider's behaviour.
public class RetryPolicy {
    public final int maxAttempts;
    private final long baseBackoffMs;

    public RetryPolicy(int maxAttempts, long baseBackoffMs) {
        this.maxAttempts = maxAttempts;
        this.baseBackoffMs = baseBackoffMs;
    }

    public long backoffMs(int attempt) {
        return baseBackoffMs * (long) Math.pow(2, attempt - 1);   // 200, 400, 800, ...
    }
}