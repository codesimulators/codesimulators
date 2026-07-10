// Translates our interface into Stripe's actual SDK. Simulated here to
// always exhaust its retry budget, so the demo can show a same-provider
// retry followed by a failover.
public class StripeGateway implements PaymentGateway {
    private int failuresLeft = 3;

    @Override public String getName() { return "Stripe"; }

    @Override
    public ProviderResult charge(long amountCents, String idempotencyKey) {
        if (failuresLeft-- > 0) throw new TransientProviderError("Stripe timeout");
        return new ProviderResult("stripe_" + idempotencyKey);
    }
}