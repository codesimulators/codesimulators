import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PaymentOrchestrator {

    public static class PaymentResult {
        public final String status = "SUCCEEDED";
        public final String provider;
        public final String providerRef;
        public PaymentResult(String provider, String providerRef) {
            this.provider = provider; this.providerRef = providerRef;
        }
    }

    public static class AllProvidersFailed extends RuntimeException {}

    private final List<PaymentGateway> providers;
    private final RetryPolicy retryPolicy;
    private final Map<String, PaymentResult> idempotency = new ConcurrentHashMap<>();
    private final Map<String, PaymentRecord> records = new ConcurrentHashMap<>();

    public PaymentOrchestrator(List<PaymentGateway> providers, RetryPolicy retryPolicy) {
        this.providers = providers;
        this.retryPolicy = retryPolicy;
    }

    // Facade — walks the provider chain, applies the retry policy per
    // provider, updates the persisted status, and checks idempotency before
    // touching anything. Never imports a provider SDK directly.
    public PaymentResult charge(String orderId, long amountCents, String idempotencyKey) {
        PaymentResult cached = idempotency.get(idempotencyKey);
        if (cached != null) return cached;                  // retry — do nothing new

        PaymentRecord record = new PaymentRecord(orderId, amountCents);
        record.markProcessing();
        records.put(idempotencyKey, record);

        for (PaymentGateway provider : providers) {
            for (int attempt = 1; attempt <= retryPolicy.maxAttempts; attempt++) {
                record.attempts++;
                try {
                    PaymentGateway.ProviderResult providerResult = provider.charge(amountCents, idempotencyKey);
                    record.markSucceeded(provider.getName());
                    PaymentResult result = new PaymentResult(provider.getName(), providerResult.providerRef);
                    idempotency.put(idempotencyKey, result);
                    return result;
                } catch (PaymentGateway.TransientProviderError e) {
                    if (attempt == retryPolicy.maxAttempts) break;      // exhausted this provider
                    // real code: sleep(retryPolicy.backoffMs(attempt)) before the next attempt
                }
            }
            // fall through — try the next provider in the chain
        }

        record.markFailed();
        throw new AllProvidersFailed();
    }

    public PaymentRecord statusOf(String idempotencyKey) { return records.get(idempotencyKey); }
}