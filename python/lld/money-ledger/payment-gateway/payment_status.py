from enum import Enum


class PaymentStatus(Enum):
    """The lifecycle every payment moves through — always queryable,
    never guessed."""
    CREATED = "CREATED"
    PROCESSING = "PROCESSING"
    SUCCEEDED = "SUCCEEDED"
    FAILED = "FAILED"