// The persisted record of one charge attempt.
public class PaymentRecord {
    public final String orderId;
    public final long amountCents;
    public PaymentStatus status = PaymentStatus.CREATED;
    public String provider;
    public int attempts = 0;

    public PaymentRecord(String orderId, long amountCents) {
        this.orderId = orderId;
        this.amountCents = amountCents;
    }

    public void markProcessing() { status = PaymentStatus.PROCESSING; }
    public void markSucceeded(String provider) { status = PaymentStatus.SUCCEEDED; this.provider = provider; }
    public void markFailed() { status = PaymentStatus.FAILED; }
}