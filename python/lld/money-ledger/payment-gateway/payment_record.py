from payment_status import PaymentStatus


class PaymentRecord:
    """The persisted record of one charge attempt."""

    def __init__(self, order_id: str, amount_cents: int):
        self.order_id = order_id
        self.amount_cents = amount_cents
        self.status = PaymentStatus.CREATED
        self.provider = None
        self.attempts = 0

    def mark_processing(self) -> None:
        self.status = PaymentStatus.PROCESSING

    def mark_succeeded(self, provider: str) -> None:
        self.status = PaymentStatus.SUCCEEDED
        self.provider = provider

    def mark_failed(self) -> None:
        self.status = PaymentStatus.FAILED