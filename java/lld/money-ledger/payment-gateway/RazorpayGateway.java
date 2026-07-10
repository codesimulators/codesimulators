// A second adapter — succeeds immediately, standing in as the failover target.
public class RazorpayGateway implements PaymentGateway {
    @Override public String getName() { return "Razorpay"; }

    @Override
    public ProviderResult charge(long amountCents, String idempotencyKey) {
        return new ProviderResult("razorpay_" + idempotencyKey);
    }
}