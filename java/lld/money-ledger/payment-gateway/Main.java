import java.util.List;

public class Main {
    public static void main(String[] args) {
        PaymentOrchestrator gateway = new PaymentOrchestrator(
            List.of(new StripeGateway(), new RazorpayGateway()), new RetryPolicy(3, 200));

        PaymentOrchestrator.PaymentResult result = gateway.charge("order-42", 4999, "k-charge-1");
        System.out.println(result.provider + " " + result.providerRef);
        // Stripe fails 3 times (its retry budget), fails over to Razorpay:
        // Razorpay razorpay_k-charge-1

        PaymentOrchestrator.PaymentResult retried = gateway.charge("order-42", 4999, "k-charge-1");
        System.out.println(retried == result);   // true — served from the idempotency cache
    }
}