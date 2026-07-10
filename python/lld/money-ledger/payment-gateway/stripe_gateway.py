from payment_gateway import PaymentGateway, ProviderResult, TransientProviderError


class StripeGateway(PaymentGateway):
    """Translates our interface into Stripe's actual SDK. Simulated here to
    always exhaust its retry budget, so the demo can show a same-provider
    retry followed by a failover."""

    name = "Stripe"

    def __init__(self):
        self._failures_left = 3

    def charge(self, amount_cents: int, idempotency_key: str) -> ProviderResult:
        if self._failures_left > 0:
            self._failures_left -= 1
            raise TransientProviderError("Stripe timeout")
        return ProviderResult(f"stripe_{idempotency_key}")