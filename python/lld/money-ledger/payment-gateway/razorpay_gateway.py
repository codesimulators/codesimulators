from payment_gateway import PaymentGateway, ProviderResult


class RazorpayGateway(PaymentGateway):
    """A second adapter — succeeds immediately, standing in as the
    failover target."""

    name = "Razorpay"

    def charge(self, amount_cents: int, idempotency_key: str) -> ProviderResult:
        return ProviderResult(f"razorpay_{idempotency_key}")