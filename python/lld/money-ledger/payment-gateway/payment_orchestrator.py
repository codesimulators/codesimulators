from dataclasses import dataclass
from payment_gateway import TransientProviderError
from payment_record import PaymentRecord


class AllProvidersFailed(Exception):
    pass


@dataclass
class PaymentResult:
    status: str
    provider: str
    provider_ref: str


class PaymentOrchestrator:
    """Facade — walks the provider chain, applies the retry policy per
    provider, updates the persisted status, and checks idempotency before
    touching anything. Never imports a provider SDK directly."""

    def __init__(self, providers, retry_policy):
        self._providers = providers
        self._retry_policy = retry_policy
        self._idempotency = {}
        self._records = {}

    def charge(self, order_id: str, amount_cents: int, idempotency_key: str) -> PaymentResult:
        cached = self._idempotency.get(idempotency_key)
        if cached is not None:
            return cached  # retry — do nothing new

        record = PaymentRecord(order_id, amount_cents)
        record.mark_processing()
        self._records[idempotency_key] = record

        for provider in self._providers:
            for attempt in range(1, self._retry_policy.max_attempts + 1):
                record.attempts += 1
                try:
                    provider_result = provider.charge(amount_cents, idempotency_key)
                    record.mark_succeeded(provider.name)
                    result = PaymentResult("SUCCEEDED", provider.name, provider_result.provider_ref)
                    self._idempotency[idempotency_key] = result
                    return result
                except TransientProviderError:
                    if attempt == self._retry_policy.max_attempts:
                        break  # exhausted this provider
                    # real code: sleep(self._retry_policy.backoff_ms(attempt)) before the next attempt
            # fall through — try the next provider in the chain

        record.mark_failed()
        raise AllProvidersFailed()

    def status_of(self, idempotency_key: str):
        return self._records.get(idempotency_key)