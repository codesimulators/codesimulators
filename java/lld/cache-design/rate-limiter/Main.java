public class Main {
    public static void main(String[] args) {
        RateLimiter limiter = new RateLimiter(new TokenBucketStrategy(5, 1.0 / 200));   // 5 tokens, 1 per 200ms

        for (int i = 0; i < 6; i++) {
            RateLimitStrategy.RateLimitResult r = limiter.isAllowed("client-1", System.currentTimeMillis());
            System.out.println(r.allowed + " " + r.retryAfterMs);
        }
        // 5x "true 0", then "false ~200"
    }
}