from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass


class TransientProviderError(Exception):
    pass


@dataclass
class ProviderResult:
    provider_ref: str


class PaymentGateway(ABC):
    """Adapter interface — every provider SDK is hidden behind this one
    contract."""

    name: str

    @abstractmethod
    def charge(self, amount_cents: int, idempotency_key: str) -> ProviderResult: ...