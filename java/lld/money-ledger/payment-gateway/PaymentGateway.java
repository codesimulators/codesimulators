// Adapter interface — every provider SDK is hidden behind this one contract.
public interface PaymentGateway {
    String getName();
    ProviderResult charge(long amountCents, String idempotencyKey);

    class ProviderResult {
        public final String providerRef;
        public ProviderResult(String providerRef) { this.providerRef = providerRef; }
    }

    class TransientProviderError extends RuntimeException {
        public TransientProviderError(String message) { super(message); }
    }
}